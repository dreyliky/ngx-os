import { BaseDragStrategy } from './base-drag.strategy';
import { DragStrategyByAxisProperties } from './by-axis-properties-drag.strategy';

/** @internal */
export class DragStrategyByAxisPropertyImpl extends BaseDragStrategy {
    public updateElementPosition(event: MouseEvent): void {
        const strategyConfig = this.context.config.strategy as DragStrategyByAxisProperties;

        this.context.movableElement.style.setProperty(
            strategyConfig.xAxisStyleProperty,
            `${event.clientX - this.shiftX}px`
        );

        this.context.movableElement.style.setProperty(
            strategyConfig.yAxisStyleProperty,
            `${event.clientY - this.shiftY}px`
        );
    }
}
