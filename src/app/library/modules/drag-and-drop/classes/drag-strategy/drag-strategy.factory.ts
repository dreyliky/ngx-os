import { Type } from '@angular/core';
import { DraggableDirective } from '../../directives/draggable.directive';
import { DragStrategyType } from '../../types';
import { BaseDragStrategy } from './base-drag.strategy';
import { DragStrategyByAxisPropertiesImpl } from './by-axis-properties-drag-impl.strategy';
import { DragStrategyByAxisProperties } from './by-axis-properties-drag.strategy';
import { DragStrategyByTranslate3dImpl } from './by-translate3d-drag-impl.strategy';
import { DragStrategyByTranslate3d } from './by-translate3d-drag.strategy';

/** @internal */
export abstract class DragStrategyFactory {
    private static readonly strategyMap = new Map<string, Type<BaseDragStrategy>>()
        .set(
            DragStrategyByAxisProperties.name,
            DragStrategyByAxisPropertiesImpl
        )
        .set(
            DragStrategyByTranslate3d.name,
            DragStrategyByTranslate3dImpl
        );

    public static create(
        strategyConfig: DragStrategyType,
        context: DraggableDirective
    ): BaseDragStrategy {
        const StrategyType = this.findByConfigInstance(strategyConfig);

        if (StrategyType) {
            return new StrategyType(context);
        }

        throw new Error(
            `Incorrect type of strategyConfig. ` +
            `Can't create strategy implementation instance!`
        );
    }

    public static isDifferent(
        newStrategyConfig: DragStrategyType,
        context: DraggableDirective
    ): boolean {
        const NewStrategyType = this.findByConfigInstance(newStrategyConfig);

        return !(context.strategy instanceof NewStrategyType);
    }

    private static findByConfigInstance(
        strategyConfig: DragStrategyType
    ): Type<BaseDragStrategy> {
        const configName = (strategyConfig as Object).constructor.name;

        return this.strategyMap.get(configName);
    }
}
