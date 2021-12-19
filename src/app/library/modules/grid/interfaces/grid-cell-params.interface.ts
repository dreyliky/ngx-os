import { ɵGrid } from '../classes';

/** @internal */
export interface ɵCellParams<T = any> {
    x: number;
    y: number;
    data: T;
    context: ɵGrid<T>;
}
