import { GridDirectionEnum } from '../../enums';
import { Grid } from '../grid';
import { BaseDirectionStrategy } from './base-direction.strategy';
import { HorizontalDirectionStrategy } from './horizontal-direction.strategy';
import { VerticalDirectionStrategy } from './vertical-direction.strategy';

/** @internal */
export abstract class GridDirectionStrategyFactory {
    public static create<T>(type: GridDirectionEnum, context: Grid<T>): BaseDirectionStrategy<T> {
        switch (type) {
            case GridDirectionEnum.Horizontal:
                return new HorizontalDirectionStrategy(context);
            case GridDirectionEnum.Vertical:
                return new VerticalDirectionStrategy(context);
            default:
                throw new Error(
                    'Incorrect type of directionEnum.' +
                        'Can\'t create direction strategy!'
                );
        }
    }
}
