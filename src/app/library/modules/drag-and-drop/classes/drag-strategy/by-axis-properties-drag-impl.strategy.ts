import { DragStrategyEnum } from '../../enums';
import { BaseDragStrategyImpl } from './base-drag-impl.strategy';
import { DragStrategyByAxisProperties } from './by-axis-properties-drag.strategy';

/** @internal */
export class DragStrategyByAxisPropertiesImpl extends BaseDragStrategyImpl {
    public readonly type = DragStrategyEnum.ByAxisProperties;

    public updateElementPosition(event: MouseEvent): void {
        if (this.context.config.isAllowMoveElement) {
            const strategyConfig = this.context.config.strategy as DragStrategyByAxisProperties;

            this.context.movableElement.style.setProperty(
                strategyConfig.xAxisLeftStyleProperty,
                `${event.clientX - this.shiftX}px`
            );

            this.context.movableElement.style.setProperty(
                strategyConfig.yAxisTopStyleProperty,
                `${event.clientY - this.shiftY}px`
            );
        }
    }
}
