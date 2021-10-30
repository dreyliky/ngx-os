import { DraggableDirective } from '../../directives/draggable.directive';
import { DragStrategyEnum } from '../../enums';
import { DragStrategyType } from '../../types';
import { BaseDragStrategyImpl } from './base-drag-impl.strategy';
import { DragStrategyByAxisPropertiesImpl } from './by-axis-properties-drag-impl.strategy';
import { DragStrategyByTranslate3dImpl } from './by-translate3d-drag-impl.strategy';

/** @internal */
export abstract class DragStrategyFactory {
    public static create(
        strategyConfig: DragStrategyType,
        context: DraggableDirective
    ): BaseDragStrategyImpl {
        switch (strategyConfig.type) {
            case DragStrategyEnum.ByAxisProperties:
                return new DragStrategyByAxisPropertiesImpl(context);
            case DragStrategyEnum.ByTranslate3d:
                return new DragStrategyByTranslate3dImpl(context);
            default:
                throw new Error(
                    `Incorrect type of strategyConfig. ` +
                    `Can't create strategy implementation instance!`
                );
        }
    }

    public static isDifferent(
        newStrategyConfig: DragStrategyType,
        context: DraggableDirective
    ): boolean {
        return (context.strategy?.type !== newStrategyConfig.type);
    }
}
