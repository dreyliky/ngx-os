import { Directive, ElementRef } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ɵDestroyService } from '../../../../../core';
import {
    ɵDynamicWindowCssVariableEnum as CssVariable
} from '../../../enums';
import { DynamicWindowConfig } from '../../../interfaces';
import { ɵMergedConfigService } from '../services';

/** @internal */
@Directive({
    selector: 'os-window[osDynamicWindowCssVariablesBinding]'
})
export class ɵDynamicWindowCssVariablesBindingDirective {
    constructor(
        private readonly mergedConfigService: ɵMergedConfigService,
        private readonly viewDestroyed$: ɵDestroyService,
        private readonly elementRef: ElementRef<HTMLElement>
    ) {
        this.initMergedConfigObserver();
    }

    private initMergedConfigObserver(): void {
        this.mergedConfigService.data$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((config) => this.applyCssVariablesToElementRef(config));
    }

    private applyCssVariablesToElementRef(config: DynamicWindowConfig): void {
        const windowElement = this.elementRef.nativeElement;

        this.applyCssVariable(CssVariable.Left, `${config.positionX}px`);
        this.applyCssVariable(CssVariable.Top, `${config.positionY}px`);
        this.applyCssVariable(CssVariable.RealWidth, `${windowElement.offsetWidth}px`);
        this.applyCssVariable(CssVariable.RealHeight, `${windowElement.offsetHeight}px`);
        this.applyCssVariable(CssVariable.CoordinateForHidingX, config.hidesInto?.x);
        this.applyCssVariable(CssVariable.CoordinateForHidingY, config.hidesInto?.y);
        this.applyCssVariable(CssVariable.FullscreenOffsetTop, config.fullscreenOffset?.top);
        this.applyCssVariable(CssVariable.FullscreenOffsetRight, config.fullscreenOffset?.right);
        this.applyCssVariable(CssVariable.FullscreenOffsetBottom, config.fullscreenOffset?.bottom);
        this.applyCssVariable(CssVariable.FullscreenOffsetLeft, config.fullscreenOffset?.left);
    }

    private applyCssVariable(variable: CssVariable, value: any): void {
        const windowElement = this.elementRef.nativeElement;

        windowElement.style.setProperty(variable, value);
    }
}
