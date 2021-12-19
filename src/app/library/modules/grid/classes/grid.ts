import { ɵIsNil } from '../../../core';
import { GridDirectionEnum } from '../enums';
import { ɵGridParams } from '../interfaces';
import { ɵBaseDirectionStrategy, ɵGridDirectionStrategyFactory } from './direction';
import { ɵCell } from './grid-cell';

/** @internal */
export class ɵGrid<T = any> implements ɵGridParams {
    public xAxisCellsCount: number = 10;
    public yAxisCellsCount: number = 10;
    public readonly directionType: GridDirectionEnum = GridDirectionEnum.Horizontal;
    public readonly directionStrategy: ɵBaseDirectionStrategy<T>;
    public structure: ɵCell<T>[][] = [];

    constructor(params: ɵGridParams) {
        Object.assign(this, params);
        this.validateCellsCount();

        this.directionStrategy = ɵGridDirectionStrategyFactory.create(this.directionType, this);

        this.reset();
    }

    public getCell(x: number, y: number): ɵCell<T> {
        return this.structure[y][x];
    }

    public getFirstEmptyCell(): ɵCell<T> {
        const firstCell = this.getCell(0, 0);

        if (ɵIsNil(firstCell.getData())) {
            return firstCell;
        }

        return this.directionStrategy.nextWithoutData(firstCell);
    }

    public reset(): void {
        this.structure = [];

        for (let y = 0; y < this.yAxisCellsCount; y++) {
            this.structure[y] = [];

            for (let x = 0; x < this.xAxisCellsCount; x++) {
                this.structure[y][x] = new ɵCell({ x, y, data: null, context: this });
            }
        }
    }

    private validateCellsCount(): void {
        if (this.xAxisCellsCount <= 0) {
            this.xAxisCellsCount = 1;
        }

        if (this.yAxisCellsCount <= 0) {
            this.yAxisCellsCount = 1;
        }
    }
}
