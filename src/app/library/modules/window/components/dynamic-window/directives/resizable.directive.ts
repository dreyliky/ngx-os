import { AfterViewInit, Directive, inject } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ɵDestroyService } from '../../../../../core';
import { ResizableDirective, ɵResizerFactory } from '../../../../resizer';
import { ɵDynamicWindowRefModel } from '../../../classes';
import { DYNAMIC_WINDOW_REF } from '../../../data';
import {
    ɵDynamicWindowCssVariableEnum as CssVariable
} from '../../../enums';
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
    private readonly windowRef = inject<ɵDynamicWindowRefModel>(DYNAMIC_WINDOW_REF);
    private readonly viewDestroyed$ = inject(ɵDestroyService);

    public override ngAfterViewInit(): void {
        super.ngAfterViewInit();
        setTimeout(() => this.initMergedConfigObserver());
    }

    private initMergedConfigObserver(): void {
        this.mergedConfigService.data$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((config) => this.updateParametersByDynamicWindowConfig(config));
    }

    private updateParametersByDynamicWindowConfig(config: DynamicWindowConfig): void {
        this.parameters = {
            targetElement: this.windowRef.windowElement,
            minWidth: this.config.minWidth,
            minHeight: this.config.minHeight,
            maxWidth: this.config.maxWidth,
            maxHeight: this.config.maxHeight,
            allowedResizers: this.config.allowedResizers,
            xAxisLeftStyleProperty: CssVariable.Left,
            yAxisTopStyleProperty: CssVariable.Top,
            widthStyleProperty: CssVariable.Width,
            heightStyleProperty: CssVariable.Height,
            ...config.resizerConfig
        };

        this.ngOnChanges();
    }
}
