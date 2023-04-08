import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';
import { filter, forkJoin, of, switchMap, take, takeUntil } from 'rxjs';
import { ɵDestroyService } from '../../../../../core';
import { DragStrategyByAxisProperties, DraggableDirective } from '../../../../drag-and-drop';
import { ɵDynamicWindowRefModel } from '../../../classes/dynamic-window-ref';
import { DYNAMIC_WINDOW_REF } from '../../../data/dynamic-window-ref.token';
import { ɵDynamicWindowCssVariableEnum as CssVariable } from '../../../enums';
import { DynamicWindowConfig } from '../../../interfaces/config.interface';
import { ɵExitFromFullscreenHelper } from '../helpers/exit-from-fullscreen-by-dragging.helper';
import { ɵMergedConfigService } from '../services/merged-config.service';

/** @internal */
@Directive({
    selector: 'os-title-bar[osDynamicWindowDraggable]',
    exportAs: 'osWindowDraggable'
})
export class ɵDynamicWindowDraggableDirective extends DraggableDirective implements AfterViewInit {
    public get _windowElement(): HTMLElement {
        return this.windowElementRef.nativeElement;
    }

    public get _titleBarControlsElementWidth(): number {
        const element = this._titleBarElement.querySelector('.os-title-bar-controls');

        return element?.clientWidth;
    }

    public get _titleBarElement(): HTMLElement {
        return this.titleBarElementRef.nativeElement;
    }

    private readonly mergedConfigService = inject(ɵMergedConfigService);
    private readonly titleBarElementRef = inject(ElementRef);
    private readonly windowElementRef = inject(ElementRef, { skipSelf: true });
    private readonly windowRef = inject<ɵDynamicWindowRefModel>(DYNAMIC_WINDOW_REF);
    private readonly viewDestroyed$ = inject(ɵDestroyService);

    private readonly mergedConfigOnce$ = this.mergedConfigService.data$
        .pipe(take(1));

    private readonly draggerStrategy = new DragStrategyByAxisProperties({
        xAxisLeftStyleProperty: CssVariable.Left,
        yAxisTopStyleProperty: CssVariable.Top
    });

    public override ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.initDragStartObserver();
        this.onDragEndObserver();
        this.initMergedConfigObserver();
    }

    // eslint-disable-next-line max-lines-per-function
    private initDragStartObserver(): void {
        this.osDragStart
            .pipe(
                switchMap(({ originalEvent }) => forkJoin({
                    config: this.mergedConfigOnce$,
                    event: of(originalEvent)
                })),
                filter(({ config }) => (
                    this.windowRef.isFullscreen &&
                    config.isExitFullscreenByDragTitleBar
                )),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe(({ event }) => {
                const exitFullscreenHelper = new ɵExitFromFullscreenHelper(this);

                this.updateConfigWithoutChanges({
                    shiftX: exitFullscreenHelper.getPointerShiftX(event),
                    shiftY: exitFullscreenHelper.getPointerShiftY(event)
                });
            });
    }

    private onDragEndObserver(): void {
        this.osDragEnd
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => this.updateConfigWithoutChanges({ shiftX: null, shiftY: null }));
    }

    private initMergedConfigObserver(): void {
        this.mergedConfigService.data$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((config) => this.updateParametersByDynamicWindowConfig(config));
    }

    private updateParametersByDynamicWindowConfig(config: DynamicWindowConfig): void {
        this.parameters = {
            draggableElement: this._titleBarElement,
            movableElement: this._windowElement,
            childElementsBlackList: Array.from(
                this._titleBarElement.querySelectorAll('.os-title-bar-button .os-icon')
            ),
            strategy: this.draggerStrategy,
            ...config.draggerConfig
        };

        this.ngOnChanges();
    }
}
