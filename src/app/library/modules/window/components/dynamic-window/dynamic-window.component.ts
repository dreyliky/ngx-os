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
import { ɵDynamicWindowRefModel } from '../../classes';
import { DYNAMIC_WINDOW_REF } from '../../data';
import { DynamicWindowConfig } from '../../interfaces';
import { WindowComponent } from '../window';
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

    @ViewChild('content', { read: ViewContainerRef, static: true })
    private readonly contentViewRef: ViewContainerRef;

    @ViewChild(WindowComponent, { read: ElementRef })
    private readonly windowElementRef: ElementRef<HTMLElement>;

    @ViewChild(ɵDynamicWindowDraggableDirective, { static: true })
    private readonly draggableDirective: ɵDynamicWindowDraggableDirective;

    @ViewChild(ɵDynamicWindowResizableDirective, { static: true })
    private readonly resizableDirective: ɵDynamicWindowResizableDirective;

    private readonly baseZIndex: number = 1000;
    private readonly alwaysOnTopBaseZIndex: number = 5000;

    private childComponentRef: ComponentRef<any>;

    constructor(
        @Inject(DYNAMIC_WINDOW_REF) public readonly windowRef: ɵDynamicWindowRefModel,
        public readonly stateManager: ɵStateManager,
        public readonly changeDetector: ChangeDetectorRef,
        private readonly mergedConfigService: ɵMergedConfigService,
        private readonly dynamicStateManager: ɵDynamicStateManager,
        private readonly viewDestroyed$: ɵDestroyService,
        private readonly globalEvents: ɵGlobalEvents
    ) {}

    public ngOnInit(): void {
        this.initConfigObserver();
        this.initIsActiveObserver();
    }

    public ngAfterViewInit(): void {
        this.childComponentRef = this.contentViewRef.createComponent(this.childComponentType);

        this.initDynamicStateChangeObserver();
        this.initMousedownObserver();
        this.windowRef.setWindowElement(this.windowElementRef.nativeElement);
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

    public onDragging(): void {
        if (this.config.isExitFullscreenByDragTitleBar && this.windowRef.isFullscreen) {
            this.windowRef.goWindowed();
        }
    }

    public onTitleBarDblClick(): void {
        if (this.config.isAllowFullscreen && this.config.isToggleFullscreenByDblClickOnTitleBar) {
            this.windowRef.toggleFullscreen();
        }
    }

    private initMousedownObserver(): void {
        fromEvent(this.windowElementRef.nativeElement, 'mousedown')
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => this.windowRef.makeActive());
    }

    private initOutsideClickObserver(): void {
        this.globalEvents.fromDocument('click')
            .pipe(
                // Waiting ~4 ms for skipping currently bubbling click event, which probably triggered our dynamic window.
                skipUntil(timer(4)),
                filter(() => this.stateManager.isWindowed || this.stateManager.isFullscreen),
                filter((event) => ɵEventOutside.checkForElement(
                    this.windowElementRef.nativeElement,
                    event
                )),
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
