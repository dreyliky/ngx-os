import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    HostListener,
    OnDestroy,
    OnInit,
    Type,
    ViewChild
} from '@angular/core';
import { IdGenerator, OutsideClick } from '@lib-helpers';
import { Subscription } from 'rxjs';
import { DragInfo, OsDraggableDirective } from '../../../drag-and-drop';
import { ResizeInfo, ResizerEnum } from '../../../resizer';
import { DynamicWindowConfig, DynamicWindowRef } from '../../classes';
import { DynamicWindowContentDirective } from '../../directives';
import { DynamicWindowInstanceService } from './dynamic-window-instance.service';

@Component({
    selector: 'os-dynamic-window',
    templateUrl: './dynamic-window.component.html',
    styleUrls: ['./dynamic-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DynamicWindowInstanceService
    ]
})
export class DynamicWindowComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(DynamicWindowContentDirective, { static: true })
    private readonly _dynamicWindowContent: DynamicWindowContentDirective;

    @ViewChild(OsDraggableDirective, { static: true })
    private readonly _draggableDirective: OsDraggableDirective;

    public childComponentType: Type<any>;
    public config: DynamicWindowConfig;
    public windowRef: DynamicWindowRef;

    public width: string;
    public height: string;
    public allowedResizers: ResizerEnum[];
    public positionX: string;
    public positionY: string;
    public zIndex: number;
    public styleObject: object;
    public isActive: boolean = false;
    public isFullscreen: boolean = false;
    public isHidden: boolean = false;
    public isOpening: boolean = true;
    public isDragging: boolean = false;
    public isResizing: boolean = false;
    public isClosing: boolean = false;
    public windowIdOrderIndex: number = 0;

    public isAllowResizing: boolean = true;
    public isAllowDragging: boolean = true;

    public windowElement: HTMLElement;
    public titleBarElement: HTMLDivElement;
    public titleBarButtons: HTMLButtonElement[] = [];

    private readonly _id: string = IdGenerator.generate('os-window');
    private readonly _baseZIndex: number = 1000;
    private readonly _alwaysOnTopZIndex: number = 5000;

    private _childComponentRef: ComponentRef<any>;

    private _widthAtWindowedMode: number;
    private _heightAtWindowedMode: number;

    private _isAfterExitFullscreenByDragging: boolean = false;

    private readonly _subscriptions: Subscription[] = [];

    constructor(
        private readonly dynamicWindowElementRef: ElementRef,
        private readonly instance: DynamicWindowInstanceService,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.positionX = `${this.config.positionX}px`;
        this.positionY = `${this.config.positionY}px`;
        this.isHidden = this.config.isHidden;

        this.windowRef.setFullscreenState(this.config.isFullscreen);
    }

    public ngOnDestroy(): void {
        if (this._childComponentRef) {
            this._childComponentRef.destroy();
        }

        this._subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }

    public ngAfterViewInit(): void {
        this.instance.control.setActiveStateForWindowId(this._id);

        this.loadChildComponent(this.childComponentType);

        this.initIsOpeningState();
        this.initHtmlElements();
        this.initIsHiddenStateObserver();
        this.initIsFullscreenStateObserver();
        this.initAfterClosedStateObserver();
        this.initActiveWindowIdObserver();
        this.initWindowIdOrderObserver();
        this.initConfigObserver();
        this.initWindowSizes();

        this.windowRef._setWindowElement(this.windowElement);

        this.changeDetector.detectChanges();
    }

    @HostListener('document:click', ['$event'])
    public onClickOutside(event: MouseEvent): void {
        const isClickOutsideWindow = OutsideClick.checkForElement(this.windowElement, event);

        if (isClickOutsideWindow && this.isActive) {
            this.instance.control.resetActiveWindowId();
        }
    }

    public onMinimizeButtonClick(): void {
        if (this.config.onMinimizeButtonClick) {
            this.config.onMinimizeButtonClick();
        } else {
            this.windowRef.hide();
        }
    }

    public onMaximizeButtonClick(): void {
        if (this.config.onMaximizeButtonClick) {
            this.config.onMaximizeButtonClick();
        } else {
            this.windowRef.setFullscreenState(!this.isFullscreen);
        }
    }

    public onCloseButtonClick(): void {
        if (this.config.onCloseButtonClick) {
            this.config.onCloseButtonClick();
        } else {
            this.windowRef.close();
        }
    }

    public onWindowMouseDown(): void {
        this.instance.control.setActiveStateForWindowId(this._id);
    }

    public onBeforeDragStart(): void {
        if (this.config.isExitFullscreenByDragTitle && this.isFullscreen) {
            const titleBarDomRect = this.titleBarElement.getBoundingClientRect();

            this._draggableDirective.draggerConfig = {
                shiftX: (this._widthAtWindowedMode / 2),
                shiftY: (titleBarDomRect.height / 2)
            };
        }
    }

    public onDragStart(): void {
        this.isDragging = true;
    }

    public onDragging(): void {
        if (this.config.isExitFullscreenByDragTitle && this.isFullscreen) {
            this.windowRef.goWindowed();
            this._isAfterExitFullscreenByDragging = true;
        }
    }

    public onAfterDragging(event: DragInfo): void {
        if (this._isAfterExitFullscreenByDragging) {
            this._draggableDirective.updateMovableElementPosition(event.mouseEvent);
            this._isAfterExitFullscreenByDragging = false;
        }
    }

    public onDragEnd(): void {
        this._draggableDirective.draggerConfig = { shiftX: null, shiftY: null };
        this.isDragging = false;
    }

    public onTitleBarDblClick(): void {
        if (this.config.isToggleFullscreenByDblClickTitle) {
            this.windowRef.setFullscreenState(!this.isFullscreen);
        }
    }

    public onResizeStart(): void {
        this.isResizing = true;
    }

    public onResizing(event: ResizeInfo): void {
        this._widthAtWindowedMode = event.width;
        this._heightAtWindowedMode = event.height;
    }

    public onResizeEnd(): void {
        this.isResizing = false;
    }

    private updateZIndex(): void {
        this.zIndex = (this._baseZIndex + this.windowIdOrderIndex);

        if (this.config.isAlwaysOnTop) {
            this.zIndex += this._alwaysOnTopZIndex;
        }

        this.changeDetector.detectChanges();
    }

    private loadChildComponent(componentType: Type<any>): void {
        const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        const viewContainerRef = this._dynamicWindowContent.viewContainerRef;

        viewContainerRef.clear();

        this._childComponentRef = viewContainerRef.createComponent(factory);
    }

    private initIsOpeningState(): void {
        setTimeout(() => {
            this.isOpening = false;

            this.changeDetector.detectChanges();
        }, 1000);
    }

    private initWindowSizes(): void {
        const windowDomRect = this.windowElement.getBoundingClientRect();

        this._widthAtWindowedMode = this.config.width || windowDomRect.width;
        this._heightAtWindowedMode = this.config.height || windowDomRect.height;

        this.width = `${this._widthAtWindowedMode}px`;
        this.height = `${this._heightAtWindowedMode}px`;
    }

    private initHtmlElements(): void {
        this.windowElement = this.dynamicWindowElementRef.nativeElement.querySelector('.os-window');
        this.titleBarElement = this.windowElement.querySelector('.os-title-bar');
        this.titleBarElement.querySelectorAll('button')
            .forEach((titleBarButton) => this.titleBarButtons.push(titleBarButton));
    }

    private initActiveWindowIdObserver(): void {
        const subscription = this.instance.control.activeWindowId$
            .subscribe((activeWindowId) => {
                this.isActive = (activeWindowId === this._id);

                this.updateZIndex();
            });

        this._subscriptions.push(subscription);
    }

    private initWindowIdOrderObserver(): void {
        const subscription = this.instance.control.windowIdsOrder$
            .subscribe((orderedWindowIds) => {
                this.windowIdOrderIndex = orderedWindowIds
                    .findIndex((currWindowId) => currWindowId === this._id);

                this.updateZIndex();
            });

        this._subscriptions.push(subscription);
    }

    private initAfterClosedStateObserver(): void {
        const subscription = this.windowRef.afterClosed$
            .subscribe(() => {
                this.isClosing = true;

                this.changeDetector.detectChanges();
            });

        this._subscriptions.push(subscription);
    }

    private initIsHiddenStateObserver(): void {
        const subscription = this.windowRef.isHidden$
            .subscribe((state) => {
                this.isHidden = state;

                this.changeDetector.detectChanges();
            });

        this._subscriptions.push(subscription);
    }

    private initIsFullscreenStateObserver(): void {
        const subscription = this.windowRef.isFullscreen$
            .subscribe((state) => {
                console.log(state);
                this.isFullscreen = state;
                this.isAllowDragging = !this.isFullscreen;
                this.isAllowResizing = !this.isFullscreen;

                this.changeDetector.markForCheck();
            });

        this._subscriptions.push(subscription);
    }

    private initConfigObserver(): void {
        const subscription = this.windowRef.config$
            .subscribe((updatedConfig) => {
                this.config = updatedConfig;

                this.changeDetector.detectChanges();
            });

        this._subscriptions.push(subscription);
    }
}
