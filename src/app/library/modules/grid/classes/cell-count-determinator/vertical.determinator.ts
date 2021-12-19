import { GridDirectionEnum } from '../../enums';
import {
    ɵBaseGridCellCountDeterminator as BaseDeterminator
} from './base.determinator';

/** @internal */
export class ɵVerticalGridCellCountDeterminator extends BaseDeterminator {
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
