import { Injectable, OnDestroy } from '@angular/core';

/** @internal */
@Injectable()
export class ɵTreeNodesState<T = any> implements OnDestroy {
    /** Original data tree of nodes */
    public get data(): T[] {
        return this._data;
    }

    /** Flat array of all nodes. Parents and children on the same level here */
    public get flatData(): T[] {
        return this._flatData;
    }

    private _data: T[] = [];
    private _flatData: T[] = [];

    public ngOnDestroy(): void {
        this._data = [];
        this._flatData = [];
    }

    public set(data: T[]): void {
        this._data = data;
    }

    public _clearFlatData(): void {
        this._flatData = [];
    }

    public _pushToFlatData(node: T): void {
        this._flatData.push(node);
    }
}
