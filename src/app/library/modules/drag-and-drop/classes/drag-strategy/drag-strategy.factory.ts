import { DraggableDirective } from '../../directives/draggable.directive';
import { ɵDragStrategyEnum } from '../../enums';
import { DragStrategyType } from '../../types';
import { ɵBaseDragStrategyImpl } from './base-drag-impl.strategy';
import { ɵDragStrategyByAxisPropertiesImpl } from './by-axis-properties-drag-impl.strategy';
import { ɵDragStrategyByTranslate3dImpl } from './by-translate3d-drag-impl.strategy';

/** @internal */
export abstract class ɵDragStrategyFactory {
    public static create(
        strategyConfig: DragStrategyType,
        context: DraggableDirective
    ): ɵBaseDragStrategyImpl {
        switch (strategyConfig.type) {
            case ɵDragStrategyEnum.ByAxisProperties:
                return new ɵDragStrategyByAxisPropertiesImpl(context);
            case ɵDragStrategyEnum.ByTranslate3d:
                return new ɵDragStrategyByTranslate3dImpl(context);
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
