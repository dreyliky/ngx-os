import { Grid } from '../grid';
import { Cell } from '../grid-cell';

export abstract class BaseDirectionStrategy<T> {
    constructor(
        public readonly context: Grid<T>
    ) {}

    public abstract next(cell: Cell<T>): Cell<T>;
    public abstract nextWithoutData(cell: Cell<T>): Cell<T>;
    public abstract nextWithData(cell: Cell<T>): Cell<T>;
    public abstract previous(cell: Cell<T>): Cell<T>;
    public abstract previousWithoutData(cell: Cell<T>): Cell<T>;
    public abstract previousWithData(cell: Cell<T>): Cell<T>;
}
