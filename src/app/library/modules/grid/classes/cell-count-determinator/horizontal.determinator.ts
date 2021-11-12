import { GridDirectionEnum } from '../../enums';
import {
    BaseGridCellCountDeterminator as BaseDeterminator
} from './base.determinator';

/** @internal */
export class HorizontalGridCellCountDeterminator extends BaseDeterminator {
    public readonly type = GridDirectionEnum.Horizontal;

    public calculateForAxisY(): number {
        if (this.context.isHeightResizing) {
            return Math.ceil(
                this.context._gridItemComponents.length / this.calculateForAxisX()
            );
        }

        const gridElementHeight = (
            this.context.hostElement.clientHeight ||
            this.context.hostElement.scrollHeight
        );

        return Math.floor(gridElementHeight / this.context.cellSize);
    }
}
