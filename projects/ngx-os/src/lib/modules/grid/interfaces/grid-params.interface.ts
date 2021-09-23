import { GridDirectionEnum } from '../enums';

/** @internal */
export interface IGridParams {
    xAxisCellsCount: number;
    yAxisCellsCount: number;
    directionType?: GridDirectionEnum;
}
