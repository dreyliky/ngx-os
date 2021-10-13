import { GridDirectionEnum } from '../enums';

/** @internal */
export interface GridParams {
    xAxisCellsCount: number;
    yAxisCellsCount: number;
    directionType?: GridDirectionEnum;
}
