import { Grid } from '../classes';

/** @internal */
export interface CellParams<T> {
    x: number;
    y: number;
    data: T;
    context: Grid<T>;
}
