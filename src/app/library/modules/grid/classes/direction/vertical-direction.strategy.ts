import { ɵCell } from '../grid-cell';
import { ɵBaseDirectionStrategy } from './base-direction.strategy';

/** @internal */
export class ɵVerticalDirectionStrategy<T> extends ɵBaseDirectionStrategy<T> {
    public next(cell: ɵCell<T>): ɵCell<T> {
        if (this.context.structure?.[cell.y + 1]?.[cell.x]) {
            return this.context.structure[cell.y + 1][cell.x];
        }

        return this.context.structure?.[0]?.[cell.x + 1] || null;
    }

    public nextWithoutData(cell: ɵCell<T>): ɵCell<T> {
        let actualCell: ɵCell<T> = cell.getNext();

        while (!!actualCell) {
            if (!actualCell.getData()) {
                return actualCell;
            }

            actualCell = actualCell.getNext();
        }

        return null;
    }

    public nextWithData(cell: ɵCell<T>): ɵCell<T> {
        let actualCell: ɵCell<T> = cell.getNext();

        while (!!actualCell) {
            if (actualCell.getData()) {
                return actualCell;
            }

            actualCell = actualCell.getNext();
        }

        return null;
    }

    public previous(cell: ɵCell<T>): ɵCell<T> {
        if (this.context.structure?.[cell.y - 1]?.[cell.x]) {
            return this.context.structure[cell.y - 1][cell.x];
        }

        return this.context.structure?.[this.context.yAxisCellsCount - 1]?.[cell.x - 1] || null;
    }

    public previousWithoutData(cell: ɵCell<T>): ɵCell<T> {
        let actualCell: ɵCell<T> = cell.getPrevious();

        while (!!actualCell) {
            if (!actualCell.getData()) {
                return actualCell;
            }

            actualCell = actualCell.getPrevious();
        }

        return null;
    }

    public previousWithData(cell: ɵCell<T>): ɵCell<T> {
        let actualCell: ɵCell<T> = cell.getPrevious();

        while (!!actualCell) {
            if (actualCell.getData()) {
                return actualCell;
            }

            actualCell = actualCell.getPrevious();
        }

        return null;
    }
}
