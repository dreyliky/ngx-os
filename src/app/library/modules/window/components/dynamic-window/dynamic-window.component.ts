import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ElementRef,
    Inject,
    OnInit,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { combineLatest, fromEvent, Observable } from 'rxjs';
import { filter, map, skip, takeUntil } from 'rxjs/operators';
import { EventOutside } from '../../../../core';
import { DraggableDirective, DragInfo } from '../../../drag-and-drop';
import { ResizeInfo } from '../../../resizer';
import { DYNAMIC_WINDOW_SHARED_CONFIG } from '../../data';
import { DynamicStateEnum as DynamicState, DynamicWindowCssVariableEnum as CssVariable } from '../../enums';
import { mergeConfigs } from '../../helpers';
import { DynamicWindowConfig } from '../../interfaces';
import { BaseDynamicWindowComponent } from './base-dynamic-window.component';

/** @internal */
@Component({
    selector: 'os-dynamic-window',
    templateUrl: './dynamic-window.component.html',
    styleUrls: ['./dynamic-window.component.scss'],
    host: {
        'class': 'os-dynamic-window'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicWindowComponent extends BaseDynamicWindowComponent implements OnInit, AfterViewInit {
    @ViewChild('content', { read: ViewContainerRef, static: true })
    private readonly contentViewRef: ViewContainerRef;

    @ViewChild(DraggableDirective, { static: true })
    private readonly draggableDirective: DraggableDirective;

    constructor(
        @Inject(DYNAMIC_WINDOW_SHARED_CONFIG) private sharedConfig$: Observable<DynamicWindowConfig>,
        private readonly hostElementRef: ElementRef<HTMLElement>,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initDynamicStateManager();
        this.initConfigObserver();
        this.initBeforeHiddenStateObserver();
        this.initIsHiddenStateObserver();
        this.initIsFullscreenStateObserver();
        this.initAfterClosedStateObserver();
        this.initActiveWindowIdObserver();
        this.initWindowIdOrderObserver();
        this.initOutsideClickObserver();
    }

    public ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.initChildComponent(this.childComponentType);
        this.initHtmlElements();
        this.initWindowSizes();
        this.updateComplexStructuresIfViewInit();
        this.windowRef.setWindowElement(this.windowElement);
        this.changeDetector.detectChanges();
    }

    public onHideButtonClick(): void {
        if (this.config.isAllowHide) {
            setTimeout(() => this.windowRef.hide());
        }

        this.config.onHideButtonClick?.();
    }

    public onFullscreenButtonClick(): void {
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

            this.draggableDirective.updateConfigWithoutChanges({
                shiftX: (this.widthAtWindowedMode / 2),
                shiftY: (titleBarDomRect.height / 2)
            });
        }
    }

    public onDragStart(): void {
        setTimeout(() => this.changeDetector.detach());
    }

    public onDragging(): void {
        if (this.config.isExitFullscreenByDragTitleBar && this.windowRef.isFullscreen) {
            this.isAfterExitFullscreenByDragging = true;

            this.windowRef.goWindowed();
        }
    }

    public onAfterDragging(event: DragInfo): void {
        if (this.isAfterExitFullscreenByDragging) {
            this.draggableDirective.updateMovableElementPosition(event.originalEvent);

            this.isAfterExitFullscreenByDragging = false;
        }
    }

    public onDragEnd(): void {
        this.draggableDirective.updateConfigWithoutChanges({ shiftX: null, shiftY: null });

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

    public onResizing({ resizableElement }: ResizeInfo): void {
        const { offsetWidth, offsetHeight } = resizableElement;
        this.widthAtWindowedMode = offsetWidth;
        this.heightAtWindowedMode = offsetHeight;
    }

    public onResizeEnd(): void {
        setTimeout(() => this.changeDetector.reattach());
    }

    private initChildComponent(componentType: Type<any>): void {
        this.contentViewRef.clear();

        const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        this.childComponentRef = this.contentViewRef.createComponent(factory);
    }

    private initDynamicStateManager(): void {
        this.dynamicStateManager.apply(DynamicState.Opening);
        this.dynamicStateManager.registerAfterStartCallback(() => this.changeDetector.detectChanges());
        this.dynamicStateManager.registerAfterEndCallback(() => this.changeDetector.markForCheck());
    }

    private initWindowSizes(): void {
        const { offsetWidth, offsetHeight } = this.windowElement;

        this.widthAtWindowedMode = (this.config.width ?? offsetWidth);
        this.heightAtWindowedMode = (this.config.height ?? offsetHeight);

        this.windowElement.style.setProperty(CssVariable.Width, `${this.widthAtWindowedMode}px`);
        this.windowElement.style.setProperty(CssVariable.Height, `${this.heightAtWindowedMode}px`);
    }

    private initHtmlElements(): void {
        this.windowElement = this.hostElementRef.nativeElement.querySelector('.os-window');
        this.titleBarElement = this.windowElement.querySelector('.os-title-bar');
        this.titleBarButtons = Array.from(this.titleBarElement.querySelectorAll('.os-title-bar-button .os-icon'));
    }

    private initOutsideClickObserver(): void {
        fromEvent(document, 'click')
            .pipe(
                takeUntil(this.viewDestroyed$),
                filter(() => this.windowRef.isActive),
                filter((event: MouseEvent) => EventOutside.checkForElement(this.windowElement, event))
            )
            .subscribe(() => this.windowRef.setIsActive(false));
    }

    private initActiveWindowIdObserver(): void {
        this.windowRef.isActive$
            .subscribe(() => {
                this.updateZIndex();
                this.changeDetector.markForCheck();
            });
    }

    private initWindowIdOrderObserver(): void {
        this.windowRef.orderIndex$
            .subscribe((orderIndex) => {
                this.windowOrderIndex = orderIndex;

                this.updateZIndex();
                this.changeDetector.markForCheck();
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
        combineLatest([
            this.sharedConfig$,
            this.windowRef.config$
        ])
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(([sharedConfig, updatedConfig]) => {
                this.config = mergeConfigs(updatedConfig, sharedConfig);
                this.updateComplexStructuresIfViewInit();

                this.changeDetector.markForCheck();
            });
    }
}
