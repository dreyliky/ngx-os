import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ElementRef,
    HostListener,
    Inject,
    Type,
    ViewChild
} from '@angular/core';
import { EventOutside } from '@lib-helpers';
import { mergeConfigs } from '@lib-modules/window/helpers';
import { combineLatest, Observable } from 'rxjs';
import { skip } from 'rxjs/operators';
import { DraggableDirective, IDragInfo } from '../../../drag-and-drop';
import { IResizeInfo } from '../../../resizer';
import { DYNAMIC_WINDOW_SHARED_CONFIG } from '../../data';
import { DynamicWindowContentDirective } from '../../directives';
import { DynamicStateEnum } from '../../enums';
import { IDynamicWindowParams } from '../../interfaces';
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

    @ViewChild(DraggableDirective, { static: true })
    private readonly draggableDirective: DraggableDirective;

    constructor(
        @Inject(DYNAMIC_WINDOW_SHARED_CONFIG) private sharedConfig$: Observable<IDynamicWindowParams>,
        private readonly hostElementRef: ElementRef<HTMLElement>,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngAfterViewInit(): void {
        this.initChildComponent(this.childComponentType);
        this.initDynamicStateManager();
        this.initHtmlElements();
        this.initIsHiddenStateObserver();
        this.initIsFullscreenStateObserver();
        this.initAfterClosedStateObserver();
        this.initActiveWindowIdObserver();
        this.initWindowIdOrderObserver();
        this.initConfigObserver();
        this.initWindowSizes();
        // FIXME: Probably not the component's logic
        this.windowRef.setIsActive(true);
        this.windowRef.setWindowElement(this.windowElement);
        this.changeDetector.detectChanges();
    }

    @HostListener('document:click', ['$event'])
    public onClickOutside(event: MouseEvent): void {
        if (this.windowRef.isActive) {
            const isClickOutsideWindow = EventOutside.checkForElement(this.windowElement, event);

            if (isClickOutsideWindow) {
                this.windowRef.setIsActive(false);
            }
        }
    }

    public onMinimizeButtonClick(): void {
        if (this.config.isAllowHide) {
            setTimeout(() => this.windowRef.hide());
        }

        this.config.onMinimizeButtonClick?.();
    }

    public onMaximizeButtonClick(): void {
        if (this.config.isAllowFullscreen) {
            setTimeout(() => this.windowRef.toggleFullscreen());
        }

        this.config.onMaximizeButtonClick?.();
    }

    public onCloseButtonClick(): void {
        if (this.config.isAllowClose) {
            setTimeout(() => this.windowRef.close());
        }

        this.config.onCloseButtonClick?.();
    }

    public onWindowMouseDown(): void {
        this.windowRef.setIsActive(true);
    }

    public onBeforeDragStart(): void {
        if (this.config.isExitFullscreenByDragTitleBar && this.windowRef.isFullscreen) {
            const titleBarDomRect = this.titleBarElement.getBoundingClientRect();

            this.draggableDirective.draggerConfig = {
                shiftX: (this.widthAtWindowedMode / 2),
                shiftY: (titleBarDomRect.height / 2)
            };
        }
    }

    public onDragStart(): void {
        this.isDragging = true;

        setTimeout(() => this.changeDetector.detach());
    }

    public onDragging(): void {
        if (this.config.isExitFullscreenByDragTitleBar && this.windowRef.isFullscreen) {
            this.isAfterExitFullscreenByDragging = true;

            this.windowRef.goWindowed();
            this.changeDetector.detectChanges();
        }
    }

    public onAfterDragging(event: IDragInfo): void {
        if (this.isAfterExitFullscreenByDragging) {
            this.draggableDirective.updateMovableElementPosition(event.mouseEvent);

            this.isAfterExitFullscreenByDragging = false;
        }
    }

    public onDragEnd(): void {
        this.draggableDirective.draggerConfig = { shiftX: null, shiftY: null };
        this.isDragging = false;

        this.changeDetector.reattach();
    }

    public onTitleBarDblClick(): void {
        if (this.config.isToggleFullscreenByDblClickOnTitleBar) {
            this.windowRef.toggleFullscreen();
        }
    }

    public onResizeStart(): void {
        this.isResizing = true;

        setTimeout(() => this.changeDetector.detach());
    }

    public onResizing({ width, height }: IResizeInfo): void {
        this.widthAtWindowedMode = width;
        this.heightAtWindowedMode = height;
    }

    public onResizeEnd(): void {
        this.isResizing = false;

        this.changeDetector.reattach();
    }

    private initChildComponent(componentType: Type<any>): void {
        const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        const viewContainerRef = this.dynamicWindowContent.viewContainerRef;

        viewContainerRef.clear();

        this.childComponentRef = viewContainerRef.createComponent(factory);
    }

    private initDynamicStateManager(): void {
        this.dynamicStateManager.apply(DynamicStateEnum.Opening);
        this.dynamicStateManager.registerCallback(() => {
            this.changeDetector.markForCheck();
        });
    }

    private initWindowSizes(): void {
        const windowDomRect = this.windowElement.getBoundingClientRect();

        this.widthAtWindowedMode = (this.config.width || windowDomRect.width);
        this.heightAtWindowedMode = (this.config.height || windowDomRect.height);

        this.width = `${this.widthAtWindowedMode}px`;
        this.height = `${this.heightAtWindowedMode}px`;
    }

    private initHtmlElements(): void {
        this.windowElement = this.hostElementRef.nativeElement.querySelector('.os-window');
        this.titleBarElement = this.windowElement.querySelector('.os-title-bar');
        this.titleBarButtons = Array.from(this.titleBarElement.querySelectorAll('.os-title-bar-button .os-icon'));
    }

    private initActiveWindowIdObserver(): void {
        const subscription = this.windowRef.isActive$
            .subscribe(() => {
                this.updateZIndex();
                this.changeDetector.detectChanges();
            });

        this.parentSubscription.add(subscription);
    }

    private initWindowIdOrderObserver(): void {
        const subscription = this.windowRef.orderIndex$
            .subscribe((orderIndex) => {
                this.windowOrderIndex = orderIndex;

                this.updateZIndex();
                this.changeDetector.detectChanges();
            });

        this.parentSubscription.add(subscription);
    }

    private initIsHiddenStateObserver(): void {
        const subscription = this.windowRef.isHidden$
            .pipe(skip(1))
            .subscribe((isHidden) => {
                if (isHidden) {
                    this.dynamicStateManager.apply(DynamicStateEnum.Hiding);
                } else {
                    this.dynamicStateManager.apply(DynamicStateEnum.Showing);
                }

                this.changeDetector.detectChanges();
            });

        this.parentSubscription.add(subscription);
    }

    private initIsFullscreenStateObserver(): void {
        const subscription = this.windowRef.isFullscreen$
            .pipe(skip(1))
            .subscribe((isFullscreen) => {
                if (isFullscreen) {
                    this.dynamicStateManager.apply(DynamicStateEnum.EnteringFullscreen);
                } else {
                    this.dynamicStateManager.apply(DynamicStateEnum.EnteringWindowed);
                }

                this.changeDetector.detectChanges();
            });

        this.parentSubscription.add(subscription);
    }

    private initAfterClosedStateObserver(): void {
        const subscription = this.windowRef.afterClosed$
            .subscribe(() => {
                this.dynamicStateManager.apply(DynamicStateEnum.Closing);

                this.changeDetector.detectChanges();
            });

        this.parentSubscription.add(subscription);
    }

    private initConfigObserver(): void {
        const subscription = combineLatest([
            this.sharedConfig$,
            this.windowRef.config$
        ])
            .subscribe(([sharedConfig, updatedConfig]) => {
                this.config = mergeConfigs(this.config, updatedConfig, sharedConfig);

                this.changeDetector.detectChanges();
            });

        this.parentSubscription.add(subscription);
    }
}
