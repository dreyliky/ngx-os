import { DOCUMENT } from '@angular/common';
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
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { combineLatest, fromEvent, Observable, timer } from 'rxjs';
import { filter, map, skip, skipUntil, takeUntil } from 'rxjs/operators';
import { EventOutside } from '../../../../core';
import { DraggableDirective } from '../../../drag-and-drop';
import { ResizableDirective, ResizeInfo } from '../../../resizer';
import { DYNAMIC_WINDOW_SHARED_CONFIG as SHARED_CONFIG } from '../../data';
import {
    DynamicStateEnum as DynamicState,
    DynamicWindowCssVariableEnum as CssVariable
} from '../../enums';
import { mergeConfigs } from '../../helpers';
import { DynamicWindowConfig } from '../../interfaces';
import { BaseDynamicWindowComponent } from './base-dynamic-window.component';

/**
 * @internal
 * Component, which creates when you open some window via {@link DynamicWindowService}.
 **/
@Component({
    selector: 'os-dynamic-window',
    templateUrl: './dynamic-window.component.html',
    host: {
        'class': 'os-dynamic-window'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicWindowComponent
    extends BaseDynamicWindowComponent
    implements OnInit, AfterViewInit {
    @ViewChild('content', { read: ViewContainerRef, static: true })
    private readonly contentViewRef: ViewContainerRef;

    @ViewChild(DraggableDirective, { static: true })
    private readonly draggableDirective: DraggableDirective;

    @ViewChild(ResizableDirective, { static: true })
    private readonly resizableDirective: ResizableDirective;

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        @Inject(SHARED_CONFIG) private readonly sharedConfig$: Observable<DynamicWindowConfig>,
        private readonly hostRef: ElementRef<HTMLElement>,
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
        this.initWindowIdOrderObserver();
        this.initOutsideClickObserver();
    }

    public ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.initChildComponent(this.childComponentType);
        this.initHtmlElements();
        this.initWindowSizes();
        this.initMousedownObserver();
        this.windowRef.setWindowElement(this.windowElement);
        this.windowRef.setDraggableDirective(this.draggableDirective);
        this.windowRef.setResizableDirective(this.resizableDirective);
        this.changeDetector.detectChanges();
    }

    public onHideButtonClick(): void {
        if (this.config.isAllowHide) {
            this.windowRef.hide();
        }
    }

    public onFullscreenButtonClick(): void {
        if (this.config.isAllowFullscreen) {
            this.windowRef.toggleFullscreen();
        }
    }

    public onCloseButtonClick(): void {
        if (this.config.isAllowClose) {
            this.windowRef.close();
        }
    }

    public onDragStart(): void {
        if (this.config.isExitFullscreenByDragTitleBar && this.windowRef.isFullscreen) {
            this.draggableDirective.updateConfigWithoutChanges({
                shiftX: (this.widthAtWindowedMode / 2),
                shiftY: (this.titleBarElement.clientHeight / 2)
            });
        }

        this.changeDetector.detach();
    }

    public onDragging(): void {
        if (this.config.isExitFullscreenByDragTitleBar && this.windowRef.isFullscreen) {
            this.windowRef.goWindowed();
        }
    }

    public onDragEnd(): void {
        this.draggableDirective.updateConfigWithoutChanges({ shiftX: null, shiftY: null });
        this.changeDetector.reattach();
    }

    public onTitleBarDblClick(): void {
        if (this.config.isAllowFullscreen && this.config.isToggleFullscreenByDblClickOnTitleBar) {
            this.windowRef.toggleFullscreen();
        }
    }

    public onResizeStart(): void {
        this.changeDetector.detach();
    }

    public onResizing({ resizableElement }: ResizeInfo): void {
        this.widthAtWindowedMode = resizableElement.offsetWidth;
        this.heightAtWindowedMode = resizableElement.offsetHeight;
    }

    public onResizeEnd(): void {
        this.changeDetector.reattach();
    }

    private initChildComponent(componentType: Type<any>): void {
        const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        this.childComponentRef = this.contentViewRef.createComponent(factory);
    }

    private initDynamicStateManager(): void {
        this.dynamicStateManager.apply(DynamicState.Opening);
        this.dynamicStateManager
            .registerAfterStartCallback(() => this.changeDetector.detectChanges());
        this.dynamicStateManager
            .registerAfterEndCallback(() => this.changeDetector.markForCheck());
    }

    private initWindowSizes(): void {
        this.widthAtWindowedMode = (this.config.width ?? this.windowElement.offsetWidth);
        this.heightAtWindowedMode = (this.config.height ?? this.windowElement.offsetHeight);

        this.windowElement.style.setProperty(CssVariable.Width, `${this.widthAtWindowedMode}px`);
        this.windowElement.style.setProperty(CssVariable.Height, `${this.heightAtWindowedMode}px`);
    }

    private initHtmlElements(): void {
        this.windowElement = this.hostRef.nativeElement.querySelector('.os-window');
        this.titleBarElement = this.windowElement.querySelector('.os-title-bar');
        this.titleBarButtons = Array.from(
            this.titleBarElement.querySelectorAll('.os-title-bar-button .os-icon')
        );
    }

    private initMousedownObserver(): void {
        fromEvent(this.windowElement, 'mousedown')
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => this.windowRef.makeActive());
    }

    private initOutsideClickObserver(): void {
        fromEvent(this.document, 'click')
            .pipe(
                takeUntil(this.viewDestroyed$),
                skipUntil(timer()),
                filter(() => this.windowRef.isActive),
                filter((event) => EventOutside.checkForElement(this.windowElement, event))
            )
            .subscribe(() => this.windowRef.makeInactive());
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
                map((state) => (
                    (state) ?
                        DynamicState.EnteringFullscreen :
                        DynamicState.EnteringWindowed
                ))
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

                this.changeDetector.detectChanges();
            });
    }
}
