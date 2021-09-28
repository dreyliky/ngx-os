import { DraggableDirective } from '../directives/draggable.directive';
import { DragStrategyEnum } from '../enums';
import { BaseDragStrategy } from './base-drag.strategy';
import { ByAxisPropertyDragStrategy } from './by-axis-properties-drag.strategy';
import { ByTranslate3dDragStrategy } from './by-translate3d-drag.strategy';

/** @internal */
export abstract class DragStrategyFactory {
    public static create(strategyId: DragStrategyEnum, context: DraggableDirective): BaseDragStrategy {
        switch (strategyId) {
            case DragStrategyEnum.ByAxisProperties:
                return new ByAxisPropertyDragStrategy(context);
            case DragStrategyEnum.ByTranslate3d:
                return new ByTranslate3dDragStrategy(context);
            default:
                throw new Error(`Incorrect type of strategyId. Can't create direction strategy!`);
        }
    }
}
