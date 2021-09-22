import { Grid } from '../classes';

export interface ICellParams<T> {
    x: number;
    y: number;
    data: T;
    context: Grid<T>;
}
