import { GridDirectionEnum } from '../../enums';
import {
    BaseGridCellCountDeterminator as BaseDeterminator
} from './base.determinator';

/** @internal */
export class VerticalGridCellCountDeterminator extends BaseDeterminator {
    public readonly type = GridDirectionEnum.Vertical;

    public calculateForAxisY(): number {
        const gridElementHeight = (
            this.context.hostElement.clientHeight ||
            this.context.hostElement.scrollHeight
        );
        const availableCellsCount = Math.floor(gridElementHeight / this.context.cellSize);

        if (this.context.isHeightResizing) {
            const requiredCellsCount = Math.ceil(
                this.context._gridItemComponents.length / this.calculateForAxisX()
            );

            return (requiredCellsCount > availableCellsCount) ?
                requiredCellsCount : availableCellsCount;
        }

        return availableCellsCount;
    }
}
