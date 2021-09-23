import { Cell } from '../grid-cell';
import { BaseDirectionStrategy } from './base-direction.strategy';

/** @internal */
export class HorizontalDirectionStrategy<T> extends BaseDirectionStrategy<T> {
    public next(cell: Cell<T>): Cell<T> {
        if (this.context.structure?.[cell.y]?.[cell.x + 1]) {
            return this.context.structure[cell.y][cell.x + 1];
        }

        return this.context.structure?.[cell.y + 1]?.[0] || null;
    }

    public nextWithoutData(cell: Cell<T>): Cell<T> {
        let actualCell: Cell<T> = cell.getNext();

        while (!!actualCell) {
            if (!actualCell.getData()) {
                return actualCell;
            }

            actualCell = actualCell.getNext();
        }

        return null;
    }

    public nextWithData(cell: Cell<T>): Cell<T> {
        let actualCell: Cell<T> = cell.getNext();

        while (!!actualCell) {
            if (actualCell.getData()) {
                return actualCell;
            }

            actualCell = actualCell.getNext();
        }

        return null;
    }

    public previous(cell: Cell<T>): Cell<T> {
        if (this.context.structure?.[cell.y]?.[cell.x - 1]) {
            return this.context.structure[cell.y][cell.x - 1];
        }

        return this.context.structure?.[cell.y - 1]?.[this.context.xAxisCellsCount - 1] || null;
    }

    public previousWithoutData(cell: Cell<T>): Cell<T> {
        let actualCell: Cell<T> = cell.getPrevious();

        while (!!actualCell) {
            if (!actualCell.getData()) {
                return actualCell;
            }

            actualCell = actualCell.getPrevious();
        }

        return null;
    }

    public previousWithData(cell: Cell<T>): Cell<T> {
        let actualCell: Cell<T> = cell.getPrevious();

        while (!!actualCell) {
            if (actualCell.getData()) {
                return actualCell;
            }

            actualCell = actualCell.getPrevious();
        }

        return null;
    }
}
