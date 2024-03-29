import { GridComponent } from '../../components';
import { GridDirectionEnum } from '../../enums';
import {
    ɵBaseGridCellCountDeterminator as BaseStrategy
} from './base.determinator';
import {
    ɵHorizontalGridCellCountDeterminator as HorizontalStrategy
} from './horizontal.determinator';
import {
    ɵVerticalGridCellCountDeterminator as VerticalStrategy
} from './vertical.determinator';

/** @internal */
export abstract class ɵGridCellCountDeterminatorFactory {
    public static create(direction: GridDirectionEnum, context: GridComponent): BaseStrategy {
        switch (direction) {
            case GridDirectionEnum.Horizontal:
                return new HorizontalStrategy(context);
            case GridDirectionEnum.Vertical:
                return new VerticalStrategy(context);
            default:
                throw new Error(
                    'Incorrect type of directionEnum.' +
                        'Can\'t create CellCountDeterminator strategy!'
                );
        }
    }
}
