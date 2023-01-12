import { Directive, ElementRef } from '@angular/core';
import { debounceTime, takeUntil } from 'rxjs';
import { ɵDestroyService, ɵElementResizingObserver } from '../../../../../core';
import {
    ɵDynamicWindowCssVariableEnum as CssVariable
} from '../../../enums';

/** @internal */
@Directive({
    selector: 'os-window[osDynamicWindowSizeCssVariablesBinding]'
})
export class ɵDynamicWindowSizeCssVariablesBindingDirective {
    constructor(
        private readonly viewDestroyed$: ɵDestroyService,
        private readonly elementRef: ElementRef<HTMLElement>
    ) {
        this.initElementSizeObserver();
    }

    private initElementSizeObserver(): void {
        ɵElementResizingObserver(this.elementRef.nativeElement)
            .pipe(
                debounceTime(50),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe(() => this.applyCssVariablesToElementRef());
    }

    private applyCssVariablesToElementRef(): void {
        const windowElement = this.elementRef.nativeElement;

        windowElement.style.setProperty(CssVariable.RealWidth, `${windowElement.offsetWidth}px`);
        windowElement.style.setProperty(CssVariable.RealHeight, `${windowElement.offsetHeight}px`);
    }
}
