import {
    Component,
    OnDestroy,
    AfterViewInit,
    ChangeDetectionStrategy,
    ViewChild,
    ComponentFactoryResolver,
    ComponentRef,
    Type,
    ChangeDetectorRef,
    OnInit,
    HostListener
} from '@angular/core';

import { DynamicWindowContentDirective } from '../../directives';
import { DynamicWindowConfig, DynamicWindowRef } from '../../classes';
import { WindowComponent } from '../../window.component';
import { OutsideClick } from '../../../../helpers';
import { DynamicWindowControlService } from '../../services/dynamic-window-control.service';
import { Subscription } from 'rxjs';
import { ResizerEnum } from '../../../resizer/enums';
import { DragInfo, OsDraggableDirective } from '../../../drag-and-drop';
import { ResizeInfo } from '../../../resizer/interfaces';

@Component({
    selector: 'os-dynamic-window',
    templateUrl: './dynamic-window.component.html',
    styleUrls: ['./dynamic-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicWindowComponent implements OnInit, OnDestroy, AfterViewInit {

    public childComponentType: Type<any>;
    public config: DynamicWindowConfig;
    public windowRef: DynamicWindowRef;

    public minWidth: number;
    public minHeight: number;
    public maxWidth: number;
    public maxHeight: number;
    public allowedResizers: ResizerEnum[];
    public positionX: string;
    public positionY: string;
    public zIndex: number;
    public styleObject: object;
    public isActive: boolean = false;
    public isFullscreen: boolean = false;
    public isHidden: boolean = false;
    public windowIdOrderIndex: number = 0;

    public isAllowMoveWindowByDragger: boolean = true;

    @ViewChild(DynamicWindowContentDirective, { static: true })
    private readonly _dynamicWindowContent: DynamicWindowContentDirective;

    @ViewChild(WindowComponent, { static: true })
    private readonly _windowComponent: WindowComponent;

    @ViewChild(OsDraggableDirective, { static: true })
    private readonly _draggableDirective: OsDraggableDirective;

    private readonly _baseZIndex: number = 1000;
    private readonly _alwaysOnTopZIndex: number = 5000;

    private _childComponentRef: ComponentRef<any>;

    private _windowElement: HTMLDivElement;
    private _titleBarElement: HTMLDivElement;

    private _widthAtWindowedMode: number;
    private _heightAtWindowedMode: number;

    private readonly _subscriptions: Subscription[] = [];

    constructor (
        private readonly windowControlService: DynamicWindowControlService,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit (): void {
        this.positionX = `${this.config.positionX}px`;
        this.positionY = `${this.config.positionY}px`;
        this.isFullscreen = this.config.isFullscreen;
        this.isHidden = this.config.isHidden;

        if (!this.isFullscreen) {
            this._widthAtWindowedMode = this.config.width;
            this._heightAtWindowedMode = this.config.height;
        }
    }

    public ngOnDestroy (): void {
        if (this._childComponentRef) {
            this._childComponentRef.destroy();
        }

        this._subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }

    public ngAfterViewInit (): void {
        this.windowControlService.setActiveStateForWindowId(this._windowComponent.id);

        this.loadChildComponent(this.childComponentType);

        this.initHtmlElements();

        this.initIsHiddenStateObserver();
        this.initActiveWindowIdObserver();
        this.initWindowIdOrderObserver();
        this.initConfigObserver();

        this.changeDetector.detectChanges();
    }

    @HostListener('document:click', ['$event'])
    public onClickOutside (event: MouseEvent): void {
        const isClickOutsideWindow = OutsideClick.checkForElement(this._windowElement, event);

        if (isClickOutsideWindow && this.isActive) {
            this.windowControlService.setActiveStateForWindowId(null);
        }
    }

    public onMinimizeButtonClick (): void {
        this.windowRef.hide();
    }

    public onMaximizeButtonClick (): void {
        this.isFullscreen = !this.isFullscreen;
        this.isAllowMoveWindowByDragger = !this.isFullscreen;
    }

    public onCloseButtonClick (): void {
        this.windowRef.close();
    }

    public onWindowMouseDown (): void {
        this.windowControlService.setActiveStateForWindowId(this._windowComponent.id);
    }

    public onTitleBarBeforeDrag (event: DragInfo): void {
        if (this.config.isExitFullscreenByDragTitle && this.isFullscreen) {
            const titleBarDomRect = this._titleBarElement.getBoundingClientRect();

            this._draggableDirective.draggerConfig = {
                shiftX: (this._widthAtWindowedMode / 2),
                shiftY: (titleBarDomRect.height / 2)
            };
        }
    }

    public onTitleBarDragging (event: DragInfo): void {
        if (this.config.isExitFullscreenByDragTitle && this.isFullscreen) {
            this.isFullscreen = false;
            this.isAllowMoveWindowByDragger = true;
        }
    }

    public onTitleBarDragEnd (): void {
        this._draggableDirective.draggerConfig = { shiftX: null, shiftY: null };
    }

    public onTitleBarDblClick (): void {
        if (this.config.isToggleFullscreenByDblClickTitle) {
            this.isFullscreen = !this.isFullscreen;
        }
    }

    public onWindowResizing (event: ResizeInfo): void {
        this._widthAtWindowedMode = event.width;
        this._heightAtWindowedMode = event.height;
    }

    private updateZIndex (): void {
        this.zIndex = (this._baseZIndex + this.windowIdOrderIndex);

        if (this.config.isAlwaysOnTop) {
            this.zIndex += this._alwaysOnTopZIndex;
        }

        this.changeDetector.detectChanges();
    }

    private loadChildComponent (componentType: Type<any>): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        const viewContainerRef = this._dynamicWindowContent.viewContainerRef;

        viewContainerRef.clear();

        this._childComponentRef = viewContainerRef.createComponent(componentFactory);
    }

    private initHtmlElements (): void {
        this._windowElement = document.getElementById(this._windowComponent.id) as HTMLDivElement;
        this._titleBarElement = this._windowElement.querySelector('.os-title-bar');
    }

    private initActiveWindowIdObserver (): void {
        const activeWindowIdSubscription = this.windowControlService.activeWindowId$
            .subscribe((activeWindowId) => {
                this.isActive = (activeWindowId === this._windowComponent.id);

                this.updateZIndex();
            });

        this._subscriptions.push(activeWindowIdSubscription);
    }

    private initWindowIdOrderObserver (): void {
        const windowIdOrderSubscription = this.windowControlService.windowIdsOrder$
            .subscribe((orderedWindowIds) => {
                this.windowIdOrderIndex = orderedWindowIds
                    .findIndex((currWindowId) => currWindowId === this._windowComponent.id);

                this.updateZIndex();
            });

        this._subscriptions.push(windowIdOrderSubscription);
    }

    private initIsHiddenStateObserver (): void {
        const isHiddenStateSubscription = this.windowRef.isHidden$
            .subscribe((state) => {
                this.isHidden = state;

                this.changeDetector.detectChanges();
            });

        this._subscriptions.push(isHiddenStateSubscription);
    }

    private initConfigObserver (): void {
        const configSubscription = this.windowRef.config$
            .subscribe((updatedConfig) => {
                this.config = updatedConfig;

                this.changeDetector.detectChanges();
            });

        this._subscriptions.push(configSubscription);
    }

}
