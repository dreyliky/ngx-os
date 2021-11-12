import { Grid } from '../classes';

/** @internal */
export interface CellParams<T = any> {
    x: number;
    y: number;
    data: T;
    context: Grid<T>;
}
