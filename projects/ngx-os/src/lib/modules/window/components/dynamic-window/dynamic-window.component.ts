import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ElementRef,
    HostListener,
    Inject,
    OnInit,
    Type,
    ViewChild
} from '@angular/core';
import { EventOutside } from '@lib-helpers';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, skip } from 'rxjs/operators';
import { DraggableDirective, IDragInfo } from '../../../drag-and-drop';
import { IResizeInfo } from '../../../resizer';
import { DYNAMIC_WINDOW_SHARED_CONFIG } from '../../data';
import { DynamicWindowContentDirective } from '../../directives';
import { DynamicStateEnum as DynamicState, DynamicWindowCssVariableEnum as CssVariable } from '../../enums';
import { mergeConfigs } from '../../helpers';
import { IDynamicWindowParams } from '../../interfaces';
import { BaseDynamicWindowComponent } from './base-dynamic-window.component';

@Component({
    selector: 'os-dynamic-window',
    templateUrl: './dynamic-window.component.html',
    styleUrls: ['./dynamic-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicWindowComponent extends BaseDynamicWindowComponent implements OnInit, AfterViewInit {
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

    public ngOnInit(): void {
        this.initConfigObserver();
    }

    public ngAfterViewInit(): void {
        this.initChildComponent(this.childComponentType);
        this.initDynamicStateManager();
        this.initHtmlElements();
        this.initBeforeHiddenStateObserver();
        this.initIsHiddenStateObserver();
        this.initIsFullscreenStateObserver();
        this.initAfterClosedStateObserver();
        this.initActiveWindowIdObserver();
        this.initWindowIdOrderObserver();
        this.initWindowSizes();
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

        this.config.onHideButtonClick?.();
    }

    public onMaximizeButtonClick(): void {
        if (this.config.isAllowFullscreen) {
            setTimeout(() => this.windowRef.toggleFullscreen());
        }

        this.config.onToggleFullscreenButtonClick?.();
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

            this.draggableDirective.config = {
                shiftX: (this.widthAtWindowedMode / 2),
                shiftY: (titleBarDomRect.height / 2)
            };
        }
    }

    public onDragStart(): void {
        this.changeDetector.detach();
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
        this.draggableDirective.config = { shiftX: null, shiftY: null };

        setTimeout(() => this.changeDetector.reattach());
    }

    public onTitleBarDblClick(): void {
        if (this.config.isToggleFullscreenByDblClickOnTitleBar) {
            this.windowRef.toggleFullscreen();
        }
    }

    public onResizeStart(): void {
        this.changeDetector.detach();
    }

    public onResizing({ resizableElement }: IResizeInfo): void {
        // FIXME: Try replace to something static
        const { width, height } = resizableElement.getBoundingClientRect();
        this.widthAtWindowedMode = width;
        this.heightAtWindowedMode = height;
    }

    public onResizeEnd(): void {
        setTimeout(() => this.changeDetector.reattach());
    }

    private initChildComponent(componentType: Type<any>): void {
        const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        const viewContainerRef = this.dynamicWindowContent.viewContainerRef;

        viewContainerRef.clear();

        this.childComponentRef = viewContainerRef.createComponent(factory);
    }

    private initDynamicStateManager(): void {
        this.dynamicStateManager.apply(DynamicState.Opening);
        this.dynamicStateManager.registerAfterStartCallback(() => this.changeDetector.detectChanges());
        this.dynamicStateManager.registerAfterEndCallback(() => this.changeDetector.markForCheck());
    }

    private initWindowSizes(): void {
        const { width, height } = this.windowElement.getBoundingClientRect();

        this.widthAtWindowedMode = (this.config.width ?? width);
        this.heightAtWindowedMode = (this.config.height ?? height);

        this.windowElement.style.setProperty(CssVariable.Width, `${this.widthAtWindowedMode}px`);
        this.windowElement.style.setProperty(CssVariable.Height, `${this.heightAtWindowedMode}px`);
    }

    private initHtmlElements(): void {
        this.windowElement = this.hostElementRef.nativeElement.querySelector('.os-window');
        this.titleBarElement = this.windowElement.querySelector('.os-title-bar');
        this.titleBarButtons = Array.from(this.titleBarElement.querySelectorAll('.os-title-bar-button .os-icon'));
    }

    private initActiveWindowIdObserver(): void {
        this.windowRef.isActive$
            .subscribe(() => {
                this.updateZIndex();
                this.changeDetector.detectChanges();
            });
    }

    private initWindowIdOrderObserver(): void {
        this.windowRef.orderIndex$
            .subscribe((orderIndex) => {
                this.windowOrderIndex = orderIndex;

                this.updateZIndex();
                this.changeDetector.detectChanges();
            });
    }

    private initBeforeHiddenStateObserver(): void {
        this.windowRef.beforeHidden$
            .subscribe(() => this.dynamicStateManager.apply(DynamicState.Hiding));
    }

    private initIsHiddenStateObserver(): void {
        this.windowRef.isHidden$
            .pipe(
                skip(1),
                filter((isHidden) => !isHidden)
            )
            .subscribe(() => this.dynamicStateManager.apply(DynamicState.Showing));
    }

    private initIsFullscreenStateObserver(): void {
        this.windowRef.isFullscreen$
            .pipe(
                skip(1),
                map((state) => (state) ? DynamicState.EnteringFullscreen : DynamicState.EnteringWindowed)
            )
            .subscribe((dynamicState) => this.dynamicStateManager.apply(dynamicState));
    }

    private initAfterClosedStateObserver(): void {
        this.windowRef.afterClosed$
            .subscribe(() => this.dynamicStateManager.apply(DynamicState.Closing));
    }

    private initConfigObserver(): void {
        const subscription = combineLatest([
            this.sharedConfig$,
            this.windowRef.config$
        ])
            .subscribe(([sharedConfig, updatedConfig]) => {
                this.config = mergeConfigs(updatedConfig, sharedConfig);

                this.changeDetector.detectChanges();
            });

        this.parentSubscription.add(subscription);
    }
}
