import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Type,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { fromEvent, merge, timer } from 'rxjs';
import { filter, map, skipUntil, takeUntil } from 'rxjs/operators';
import { ɵDestroyService, ɵEventOutside, ɵGlobalEvents } from '../../../../core';
import { ResizeInfo } from '../../../resizer';
import { ɵDynamicWindowRefModel } from '../../classes';
import { DYNAMIC_WINDOW_REF } from '../../data';
import {
    ɵDynamicWindowCssVariableEnum as CssVariable
} from '../../enums';
import { DynamicWindowConfig } from '../../interfaces';
import { ɵDynamicWindowDraggableDirective, ɵDynamicWindowResizableDirective } from './directives';
import { ɵDynamicStateManager, ɵMergedConfigService, ɵStateManager } from './services';

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
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        ɵStateManager,
        ɵDynamicStateManager,
        ɵMergedConfigService,
        ɵDestroyService
    ]
})
export class ɵDynamicWindowComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input()
    public childComponentType: Type<unknown>;

    public get _titleBarDisplayAttr(): string {
        return (this.config.isTitleBarVisible) ? '' : 'none';
    }

    public readonly _viewDestroyedOrWindowInactive$ = merge(
        this.viewDestroyed$,
        this.windowRef.isActive$
            .pipe(filter((isActive) => !isActive))
    );

    public readonly zIndex$ = this.windowRef.orderIndex$
        .pipe(
            map((orderIndex) => {
                let zIndex = (this.baseZIndex + orderIndex);

                if (this.config.isAlwaysOnTop) {
                    zIndex += this.alwaysOnTopBaseZIndex;
                }

                return zIndex;
            })
        );

    public config: DynamicWindowConfig;

    public windowElement: HTMLElement;
    public titleBarElement: HTMLElement;
    public titleBarButtons: HTMLElement[] = [];

    @ViewChild('content', { read: ViewContainerRef, static: true })
    private readonly contentViewRef: ViewContainerRef;

    @ViewChild(ɵDynamicWindowDraggableDirective, { static: true })
    private readonly draggableDirective: ɵDynamicWindowDraggableDirective;

    @ViewChild(ɵDynamicWindowResizableDirective, { static: true })
    private readonly resizableDirective: ɵDynamicWindowResizableDirective;

    private readonly baseZIndex: number = 1000;
    private readonly alwaysOnTopBaseZIndex: number = 5000;

    private childComponentRef: ComponentRef<any>;
    private widthAtWindowedMode: number;
    private heightAtWindowedMode: number;

    constructor(
        @Inject(DYNAMIC_WINDOW_REF) public readonly windowRef: ɵDynamicWindowRefModel,
        public readonly stateManager: ɵStateManager,
        private readonly mergedConfigService: ɵMergedConfigService,
        private readonly dynamicStateManager: ɵDynamicStateManager,
        private readonly viewDestroyed$: ɵDestroyService,
        private readonly hostRef: ElementRef<HTMLElement>,
        private readonly globalEvents: ɵGlobalEvents,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initConfigObserver();
        this.initIsActiveObserver();
    }

    public ngAfterViewInit(): void {
        this.childComponentRef = this.contentViewRef.createComponent(this.childComponentType);

        this.initDynamicStateChangeObserver();
        this.initHtmlElements();
        this.initWindowSizes();
        this.initMousedownObserver();
        this.windowRef.setWindowElement(this.windowElement);
        this.windowRef.setDraggableDirective(this.draggableDirective);
        this.windowRef.setResizableDirective(this.resizableDirective);
        this.changeDetector.detectChanges();
    }

    public ngOnDestroy(): void {
        this.childComponentRef?.destroy();
        this.windowRef.destroy();
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
        this.globalEvents.fromDocument('click')
            .pipe(
                // Waiting ~4 ms for skipping currently bubbling click event, which probably triggered our dynamic window.
                skipUntil(timer(4)),
                filter(() => this.stateManager.isWindowed || this.stateManager.isFullscreen),
                filter((event) => ɵEventOutside.checkForElement(this.windowElement, event)),
                takeUntil(this._viewDestroyedOrWindowInactive$)
            )
            .subscribe(() => this.windowRef.makeInactive());
    }

    private initIsActiveObserver(): void {
        this.windowRef.isActive$
            .subscribe((isActive) => {
                if (isActive) {
                    this.initOutsideClickObserver();
                }

                this.changeDetector.detectChanges();
            });
    }

    private initDynamicStateChangeObserver(): void {
        this.dynamicStateManager.state$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => this.changeDetector.detectChanges());
    }

    private initConfigObserver(): void {
        this.mergedConfigService.data$
            .subscribe((config) => {
                this.config = config;

                this.changeDetector.detectChanges();
            });
    }
}
