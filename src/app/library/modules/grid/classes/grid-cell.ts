import { ɵCellParams } from '../interfaces';
import { ɵGrid } from './grid';

/** @internal */
export class ɵCell<T = any> {
    public readonly x: number;
    public readonly y: number;

    private data: T;
    private context: ɵGrid<T>;

    constructor(params: ɵCellParams<T>) {
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

    public getNext(): ɵCell<T> {
        return this.context.directionStrategy.next(this);
    }

    public getNextWithoutData(): ɵCell<T> {
        return this.context.directionStrategy.nextWithoutData(this);
    }

    public getNextWithData(): ɵCell<T> {
        return this.context.directionStrategy.nextWithData(this);
    }

    public getPrevious(): ɵCell<T> {
        return this.context.directionStrategy.previous(this);
    }

    public getPreviousWithoutData(): ɵCell<T> {
        return this.context.directionStrategy.previousWithoutData(this);
    }

    public getPreviousWithData(): ɵCell<T> {
        return this.context.directionStrategy.previousWithData(this);
    }
}
