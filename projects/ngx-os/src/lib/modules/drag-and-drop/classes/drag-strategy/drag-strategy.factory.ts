import { DraggableDirective } from '../../directives/draggable.directive';
import { DragStrategyType } from '../../types';
import { BaseDragStrategy } from './base-drag.strategy';
import { DragStrategyByAxisPropertyImpl } from './by-axis-properties-drag-impl.strategy';
import { DragStrategyByAxisProperties } from './by-axis-properties-drag.strategy';
import { DragStrategyByTranslate3dImpl } from './by-translate3d-drag-impl.strategy';
import { DragStrategyByTranslate3d } from './by-translate3d-drag.strategy';

/** @internal */
export abstract class DragStrategyFactory {
    public static create(strategyConfig: DragStrategyType, context: DraggableDirective): BaseDragStrategy {
        if (strategyConfig instanceof DragStrategyByAxisProperties) {
            return new DragStrategyByAxisPropertyImpl(context);
        } else if (strategyConfig instanceof DragStrategyByTranslate3d) {
            return new DragStrategyByTranslate3dImpl(context);
        }

        throw new Error(`Incorrect type of strategyId. Can't create direction strategy!`);
    }
}
