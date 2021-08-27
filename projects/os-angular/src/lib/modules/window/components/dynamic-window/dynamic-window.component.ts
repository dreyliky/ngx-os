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
import { BaseDynamicWindowComponent } from './base-dynamic-window.component';

@Component({
    selector: 'os-dynamic-window',
    templateUrl: './dynamic-window.component.html',
    styleUrls: ['./dynamic-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicWindowComponent extends BaseDynamicWindowComponent implements AfterViewInit {
    @ViewChild(DynamicWindowContentDirective, { static: true })
    private readonly dynamicWindowContent: DynamicWindowContentDirective;

    @ViewChild(OsDraggableDirective, { static: true })
    private readonly draggableDirective: OsDraggableDirective;

    constructor(
        private readonly dynamicWindowElementRef: ElementRef,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngAfterViewInit(): void {
        this.windowRef.setIsActive(true);
        this.loadChildComponent(this.childComponentType);
        this.initDynamicStateManager();
        this.initHtmlElements();
        this.initIsHiddenStateObserver();
        this.initAfterClosedStateObserver();
        this.initActiveWindowIdObserver();
        this.initWindowIdOrderObserver();
        this.initConfigObserver();
        this.initWindowSizes();
        this.windowRef.setWindowElement(this.windowElement);

        this.changeDetector.detectChanges();
    }

    @HostListener('document:click', ['$event'])
    public onClickOutside(event: MouseEvent): void {
        const isClickOutsideWindow = OutsideClick.checkForElement(this.windowElement, event);

        if (isClickOutsideWindow && this.windowRef.isActive) {
            this.windowRef.setIsActive(false);
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
            this.windowRef.toggleFullscreen();
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
        this.windowRef.setIsActive(true);
    }

    public onBeforeDragStart(): void {
        if (this.config.isExitFullscreenByDragTitle && this.windowRef.isFullscreen) {
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
        if (this.config.isExitFullscreenByDragTitle && this.windowRef.isFullscreen) {
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
            this.windowRef.toggleFullscreen();
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

    private initDynamicStateManager(): void {
        this.dynamicStateManager.initOpeningState();
        this.dynamicStateManager.registerCallback(() => {
            this.changeDetector.detectChanges();
        });
    }

    private updateZIndex(): void {
        this.zIndex = (this.baseZIndex + this.windowOrderIndex);

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
        const subscription = this.windowRef.isActive$
            .subscribe(() => this.updateZIndex());

        this.subscriptions.push(subscription);
    }

    private initWindowIdOrderObserver(): void {
        const subscription = this.windowRef.orderIndex$
            .subscribe((orderIndex) => {
                this.windowOrderIndex = orderIndex;

                this.updateZIndex();
            });

        this.subscriptions.push(subscription);
    }

    private initAfterClosedStateObserver(): void {
        const subscription = this.windowRef.afterClosed$
            .subscribe(() => {
                this.dynamicStateManager.initClosingState();

                this.changeDetector.detectChanges();
            });

        this.subscriptions.push(subscription);
    }

    private initIsHiddenStateObserver(): void {
        const subscription = this.windowRef.isHidden$
            .pipe(skip(1))
            .subscribe((isHidden) => {
                if (isHidden) {
                    this.dynamicStateManager.initHidingState();
                } else {
                    this.dynamicStateManager.initShowingState();
                }

                this.changeDetector.detectChanges();
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
