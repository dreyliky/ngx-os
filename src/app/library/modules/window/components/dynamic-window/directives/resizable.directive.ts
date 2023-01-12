import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ɵDestroyService } from '../../../../../core';
import { ResizableDirective, ɵResizerFactory } from '../../../../resizer';
import { ɵDynamicWindowCssVariableEnum as CssVariable } from '../../../enums';
import { DynamicWindowConfig } from '../../../interfaces';
import { ɵMergedConfigService } from '../services';

/** @internal */
@Directive({
    selector: 'os-window[osDynamicWindowResizable]',
    providers: [
        ɵResizerFactory
    ]
})
export class ɵDynamicWindowResizableDirective
    extends ResizableDirective
    implements AfterViewInit {
    private readonly mergedConfigService = inject(ɵMergedConfigService);
    private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly viewDestroyed$ = inject(ɵDestroyService);

    public override ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.initMergedConfigObserver();
    }

    private initMergedConfigObserver(): void {
        this.mergedConfigService.data$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((config) => this.updateParametersByDynamicWindowConfig(config));
    }

    private updateParametersByDynamicWindowConfig(config: DynamicWindowConfig): void {
        this.parameters = {
            targetElement: this.elementRef.nativeElement,
            minWidth: config.minWidth,
            minHeight: config.minHeight,
            maxWidth: config.maxWidth,
            maxHeight: config.maxHeight,
            allowedResizers: config.allowedResizers,
            xAxisLeftStyleProperty: CssVariable.Left,
            yAxisTopStyleProperty: CssVariable.Top,
            widthStyleProperty: CssVariable.Width,
            heightStyleProperty: CssVariable.Height,
            ...config.resizerConfig
        };

        this.ngOnChanges();
    }
}
