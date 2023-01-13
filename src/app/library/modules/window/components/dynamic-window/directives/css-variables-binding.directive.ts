import { ChangeDetectorRef, Directive, ElementRef, HostBinding } from '@angular/core';
import { debounceTime, filter, takeUntil } from 'rxjs';
import { ɵDestroyService, ɵElementResizingObserver } from '../../../../../core';
import { ɵDynamicWindowCssVariableEnum as CssVariable } from '../../../enums';
import { DynamicWindowConfig } from '../../../interfaces';
import { ɵMergedConfigService } from '../services';

/** @internal */
@Directive({
    selector: 'os-window[osDynamicWindowCssVariablesBinding]'
})
export class ɵDynamicWindowCssVariablesBindingDirective {
    @HostBinding('style')
    public cssVariables: object = {};

    @HostBinding(`style.${CssVariable.RealWidth}`)
    public realWidthInPx: string;

    @HostBinding(`style.${CssVariable.RealHeight}`)
    public realHeightInPx: string;

    constructor(
        private readonly mergedConfigService: ɵMergedConfigService,
        private readonly viewDestroyed$: ɵDestroyService,
        private readonly elementRef: ElementRef<HTMLElement>,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        this.initElementSizeObserver();
        this.initMergedConfigObserver();
    }

    private initMergedConfigObserver(): void {
        this.mergedConfigService.data$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((config) => this.updateCssVariables(config));
    }

    private initElementSizeObserver(): void {
        ɵElementResizingObserver(this.elementRef.nativeElement)
            .pipe(
                debounceTime(50),
                filter(({ offsetWidth, offsetHeight }) => (!!offsetWidth && !!offsetHeight)),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe((windowElement) => this.updateRealSizeProperties(windowElement));
    }

    private updateCssVariables(config: DynamicWindowConfig): void {
        this.cssVariables = {
            [CssVariable.Left]: `${config.positionX}px`,
            [CssVariable.Top]: `${config.positionY}px`,
            [CssVariable.Width]: `${config.width}px`,
            [CssVariable.Height]: `${config.height}px`,
            [CssVariable.CoordinateForHidingX]: config.hidesInto?.x,
            [CssVariable.CoordinateForHidingY]: config.hidesInto?.y,
            [CssVariable.FullscreenOffsetTop]: config.fullscreenOffset?.top,
            [CssVariable.FullscreenOffsetRight]: config.fullscreenOffset?.right,
            [CssVariable.FullscreenOffsetBottom]: config.fullscreenOffset?.bottom,
            [CssVariable.FullscreenOffsetLeft]: config.fullscreenOffset?.left
        };

        this.changeDetector.markForCheck();
    }

    private updateRealSizeProperties(windowElement: HTMLElement): void {
        this.realWidthInPx = `${windowElement.offsetWidth}px`;
        this.realHeightInPx = `${windowElement.offsetHeight}px`;

        this.changeDetector.markForCheck();
    }
}
