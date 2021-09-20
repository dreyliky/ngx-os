import { BaseDirectionStrategy, GridDirectionStrategyFactory } from '.';
import { GridDirectionEnum } from '../enums';
import { GridParams } from '../interfaces';
import { Cell } from './grid-cell';

export class Grid<T> implements GridParams {
    public readonly xAxisCellsCount: number = 10;
    public readonly yAxisCellsCount: number = 10;
    public readonly directionType: GridDirectionEnum = GridDirectionEnum.Horizontal;
    public readonly directionStrategy: BaseDirectionStrategy<T>;
    public structure: Cell<T>[][] = [];

    constructor(params: GridParams) {
        Object.assign(this, params);
        this.validateCellsCount();

        this.directionStrategy = GridDirectionStrategyFactory.create(this.directionType, this);

        this.reset();
    }

    public get(x: number, y: number): Cell<T> {
        return this.structure[y][x];
    }

    public reset(): void {
        this.structure = [];

        for (let y = 0; y < this.yAxisCellsCount; y++) {
            this.structure[y] = [];

            for (let x = 0; x < this.xAxisCellsCount; x++) {
                this.structure[y][x] = new Cell({ x, y, data: null, context: this });
            }
        }
    }

    private validateCellsCount(): void {
        if (this.xAxisCellsCount <= 0 || this.yAxisCellsCount <= 0) {
            throw new Error(`Incorrect grid size. Cells count by x and y axes can't be less than 1!`);
        }
    }
}
