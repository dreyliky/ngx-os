import { GridDirectionEnum } from '../../enums';
import { ɵGrid } from '../grid';
import { ɵBaseDirectionStrategy } from './base-direction.strategy';
import { ɵHorizontalDirectionStrategy } from './horizontal-direction.strategy';
import { ɵVerticalDirectionStrategy } from './vertical-direction.strategy';

/** @internal */
export abstract class ɵGridDirectionStrategyFactory {
    public static create<T>(type: GridDirectionEnum, context: ɵGrid<T>): ɵBaseDirectionStrategy<T> {
        switch (type) {
            case GridDirectionEnum.Horizontal:
                return new ɵHorizontalDirectionStrategy(context);
            case GridDirectionEnum.Vertical:
                return new ɵVerticalDirectionStrategy(context);
            default:
                throw new Error(
                    'Incorrect type of directionEnum.' +
                        'Can\'t create direction strategy!'
                );
        }
    }
}
