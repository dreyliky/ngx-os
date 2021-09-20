import { CellParams } from '../interfaces';
import { Grid } from './grid';

export class Cell<T> {
    public readonly x: number;
    public readonly y: number;

    private data: T;
    private context: Grid<T>;

    constructor(params: CellParams<T>) {
        Object.assign(this, params);
    }

    public getData(): T {
        return this.data;
    }

    public setData(data: T): void {
        this.data = data;
    }

    public clearData(): void {
        this.data = null;
    }

    public getNext(): Cell<T> {
        return this.context.directionStrategy.next(this);
    }

    public getNextWithoutData(): Cell<T> {
        return this.context.directionStrategy.nextWithoutData(this);
    }

    public getNextWithData(): Cell<T> {
        return this.context.directionStrategy.nextWithData(this);
    }

    public getPrevious(): Cell<T> {
        return this.context.directionStrategy.previous(this);
    }

    public getPreviousWithoutData(): Cell<T> {
        return this.context.directionStrategy.previousWithoutData(this);
    }

    public getPreviousWithData(): Cell<T> {
        return this.context.directionStrategy.previousWithData(this);
    }
}
