import { Grid } from '../classes';

export interface CellParams<T> {
    x: number;
    y: number;
    data: T;
    context: Grid<T>;
}
