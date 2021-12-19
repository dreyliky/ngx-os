import { GridComponent } from '../../components';
import { GridDirectionEnum } from '../../enums';

/** @internal */
export abstract class ɵBaseGridCellCountDeterminator {
    public abstract readonly type: GridDirectionEnum;

    constructor(
        protected readonly context: GridComponent
    ) {}

    public calculateForAxisX(): number {
        const gridZoneWidth = (
            this.context.hostElement.clientWidth ||
            this.context.hostElement.scrollWidth
        );
        const cellsCount = Math.floor(gridZoneWidth / this.context.cellSize);

        return (cellsCount <= 0) ? 1 : cellsCount;
    }

    public abstract calculateForAxisY(): number;
}
