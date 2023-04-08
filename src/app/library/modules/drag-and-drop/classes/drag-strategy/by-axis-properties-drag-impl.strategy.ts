import { ɵPointerHelper } from '../../../../core';
import { ɵDragStrategyEnum } from '../../enums';
import { ɵBaseDragStrategyImpl } from './base-drag-impl.strategy';
import { DragStrategyByAxisProperties } from './by-axis-properties-drag.strategy';

/** @internal */
export class ɵDragStrategyByAxisPropertiesImpl extends ɵBaseDragStrategyImpl {
    public override readonly type = ɵDragStrategyEnum.ByAxisProperties;

    public updateElementPosition(event: PointerEvent | TouchEvent): void {
        if (this.context.config.isAllowMoveElement) {
            const strategyConfig = this.context.config.strategy as DragStrategyByAxisProperties;

            this.context.movableElement.style.setProperty(
                strategyConfig.xAxisLeftStyleProperty,
                `${ɵPointerHelper.getClientX(event) - this.shiftX}px`
            );

            this.context.movableElement.style.setProperty(
                strategyConfig.yAxisTopStyleProperty,
                `${ɵPointerHelper.getClientY(event) - this.shiftY}px`
            );
        }
    }
}
