import { GridDirectionEnum } from '../enums';

export interface IGridParams {
    xAxisCellsCount: number;
    yAxisCellsCount: number;
    directionType?: GridDirectionEnum;
}
