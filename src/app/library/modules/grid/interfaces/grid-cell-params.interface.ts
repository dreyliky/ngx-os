import { Grid } from '../classes';

/** @internal */
export interface ICellParams<T> {
    x: number;
    y: number;
    data: T;
    context: Grid<T>;
}
