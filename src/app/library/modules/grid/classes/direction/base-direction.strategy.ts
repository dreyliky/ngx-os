import { ɵGrid } from '../grid';
import { ɵCell } from '../grid-cell';

/** @internal */
export abstract class ɵBaseDirectionStrategy<T = any> {
    constructor(
        public readonly context: ɵGrid<T>
    ) {}

    public abstract next(cell: ɵCell<T>): ɵCell<T>;
    public abstract nextWithoutData(cell: ɵCell<T>): ɵCell<T>;
    public abstract nextWithData(cell: ɵCell<T>): ɵCell<T>;
    public abstract previous(cell: ɵCell<T>): ɵCell<T>;
    public abstract previousWithoutData(cell: ɵCell<T>): ɵCell<T>;
    public abstract previousWithData(cell: ɵCell<T>): ɵCell<T>;
}
