import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ElementRef,
    HostListener,
    Type,
    ViewChild
} from '@angular/core';
import { OutsideClick } from '@lib-helpers';
import { skip } from 'rxjs/operators';
import { DragInfo, OsDraggableDirective } from '../../../drag-and-drop';
import { ResizeInfo } from '../../../resizer';
import { DynamicWindowContentDirective } from '../../directives';
import { WindowComponent } from '../window';
import { BaseDynamicWindowComponent } from './base-dynamic-window.component';
import { DynamicWindowInstanceService } from './dynamic-window-instance.service';

// FIXME: Implement state pattern instead of huge amount of boolean flags
@Component({
    selector: 'os-dynamic-window',
    templateUrl: './dynamic-window.component.html',
    styleUrls: ['./dynamic-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DynamicWindowInstanceService
    ]
})
export class DynamicWindowComponent extends BaseDynamicWindowComponent implements AfterViewInit {
    @ViewChild(DynamicWindowContentDirective, { static: true })
    private readonly dynamicWindowContent: DynamicWindowContentDirective;

    @ViewChild(OsDraggableDirective, { static: true })
    private readonly draggableDirective: OsDraggableDirective;

    @ViewChild(WindowComponent, { static: true })
    private readonly windowComponent: WindowComponent;

    constructor(
        private readonly dynamicWindowElementRef: ElementRef,
        private readonly instance: DynamicWindowInstanceService,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngAfterViewInit(): void {
        this.instance.control.setActiveStateForWindowId(this.windowComponent.id);

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
        this.instance.control.setActiveStateForWindowId(this.windowComponent.id);
    }

    public onBeforeDragStart(): void {
        if (this.config.isExitFullscreenByDragTitle && this.isFullscreen) {
            const titleBarDomRect = this.titleBarElement.getBoundingClientRect();

            this.draggableDirective.draggerConfig = {
                shiftX: (this.widthAtWindowedMode / 2),
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
            this.isAfterExitFullscreenByDragging = true;
        }
    }

    public onAfterDragging(event: DragInfo): void {
        if (this.isAfterExitFullscreenByDragging) {
            this.draggableDirective.updateMovableElementPosition(event.mouseEvent);
            this.isAfterExitFullscreenByDragging = false;
        }
    }

    public onDragEnd(): void {
        this.draggableDirective.draggerConfig = { shiftX: null, shiftY: null };
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
        this.widthAtWindowedMode = event.width;
        this.heightAtWindowedMode = event.height;
    }

    public onResizeEnd(): void {
        this.isResizing = false;
    }

    private updateZIndex(): void {
        this.zIndex = (this.baseZIndex + this.windowIdOrderIndex);

        if (this.config.isAlwaysOnTop) {
            this.zIndex += this.alwaysOnTopZIndex;
        }

        this.changeDetector.detectChanges();
    }

    private loadChildComponent(componentType: Type<any>): void {
        const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        const viewContainerRef = this.dynamicWindowContent.viewContainerRef;

        viewContainerRef.clear();

        this.childComponentRef = viewContainerRef.createComponent(factory);
    }

    private initIsOpeningState(): void {
        this.isOpening = true;

        setTimeout(() => {
            this.isOpening = false;

            this.changeDetector.detectChanges();
        }, this.cssAnimationClassDuration);
    }

    private initIsHidingState(): void {
        this.isHiding = true;
        this.isHidden = false;
        this.isShowing = false;

        setTimeout(() => {
            this.isHiding = false;
            this.isHidden = true;

            this.changeDetector.detectChanges();
        }, this.cssAnimationClassDuration);
    }

    private initIsShowingState(): void {
        this.isHidden = false;
        this.isHiding = false;
        this.isShowing = true;

        setTimeout(() => {
            this.isShowing = false;

            this.changeDetector.detectChanges();
        }, this.cssAnimationClassDuration);
    }

    private initWindowSizes(): void {
        const windowDomRect = this.windowElement.getBoundingClientRect();

        this.widthAtWindowedMode = this.config.width || windowDomRect.width;
        this.heightAtWindowedMode = this.config.height || windowDomRect.height;

        this.width = `${this.widthAtWindowedMode}px`;
        this.height = `${this.heightAtWindowedMode}px`;
    }

    private initHtmlElements(): void {
        this.windowElement = this.dynamicWindowElementRef.nativeElement.querySelector('.os-window');
        this.titleBarElement = this.windowElement.querySelector('.os-title-bar');
        this.titleBarElement.querySelectorAll('.os-button')
            .forEach((titleBarButton: HTMLButtonElement) => this.titleBarButtons.push(titleBarButton));
    }

    private initActiveWindowIdObserver(): void {
        const subscription = this.instance.control.activeWindowId$
            .subscribe((activeWindowId) => {
                this.isActive = (activeWindowId === this.windowComponent.id);

                this.updateZIndex();
            });

        this.subscriptions.push(subscription);
    }

    private initWindowIdOrderObserver(): void {
        const subscription = this.instance.control.windowIdsOrder$
            .subscribe((orderedWindowIds) => {
                this.windowIdOrderIndex = orderedWindowIds
                    .findIndex((currWindowId) => currWindowId === this.windowComponent.id);

                this.updateZIndex();
            });

        this.subscriptions.push(subscription);
    }

    private initAfterClosedStateObserver(): void {
        const subscription = this.windowRef.afterClosed$
            .subscribe(() => {
                this.isClosing = true;

                this.changeDetector.detectChanges();
            });

        this.subscriptions.push(subscription);
    }

    private initIsHiddenStateObserver(): void {
        const subscription = this.windowRef.isHidden$
            .pipe(skip(1))
            .subscribe((isHidden) => {
                if (isHidden) {
                    this.initIsHidingState();
                } else {
                    this.initIsShowingState();
                }

                this.changeDetector.detectChanges();
            });

        this.subscriptions.push(subscription);
    }

    private initIsFullscreenStateObserver(): void {
        const subscription = this.windowRef.isFullscreen$
            .subscribe((state) => {
                this.isFullscreen = state;
                this.isAllowDragging = !this.isFullscreen;
                this.isAllowResizing = !this.isFullscreen;

                this.changeDetector.markForCheck();
            });

        this.subscriptions.push(subscription);
    }

    private initConfigObserver(): void {
        const subscription = this.windowRef.config$
            .subscribe((updatedConfig) => {
                this.config = updatedConfig;

                this.changeDetector.detectChanges();
            });

        this.subscriptions.push(subscription);
    }
}
