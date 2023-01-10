import { AfterViewInit, Directive, inject } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ɵDestroyService } from '../../../../../core';
import { DraggableDirective, DragStrategyByAxisProperties } from '../../../../drag-and-drop';
import {
    ɵDynamicWindowCssVariableEnum as CssVariable
} from '../../../enums';
import { DynamicWindowConfig } from '../../../interfaces';
import { ɵDynamicWindowComponent } from '../dynamic-window.component';
import { ɵMergedConfigService } from '../services';

/** @internal */
@Directive({
    selector: 'os-title-bar[osDynamicWindowDraggable]'
})
export class ɵDynamicWindowDraggableDirective
    extends DraggableDirective
    implements AfterViewInit {
    private readonly mergedConfigService = inject(ɵMergedConfigService);
    private readonly context = inject(ɵDynamicWindowComponent);
    private readonly viewDestroyed$ = inject(ɵDestroyService);

    private readonly draggerStrategy = new DragStrategyByAxisProperties({
        xAxisLeftStyleProperty: CssVariable.Left,
        yAxisTopStyleProperty: CssVariable.Top
    });

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
            draggableElement: this.context.titleBarElement,
            movableElement: this.context.windowElement,
            childElementsBlackList: this.context.titleBarButtons,
            strategy: this.draggerStrategy,
            ...config.draggerConfig
        };

        this.ngOnChanges();
    }
}
