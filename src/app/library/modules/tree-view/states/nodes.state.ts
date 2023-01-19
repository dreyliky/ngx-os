import { Inject, Injectable } from '@angular/core';
import { TREE_VIEW_CHILDREN_HANDLER } from '../constants';

/** @internal */
@Injectable()
export class ɵTreeNodesState<T = any> {
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

    constructor(
        @Inject(TREE_VIEW_CHILDREN_HANDLER)
        private readonly childrenHandler: (item: T) => T[]
    ) {}

    public set(data: T[]): void {
        this._data = data;
        this._flatData = [];

        this.initFlatDataForNodesAndChildren(data);
    }

    private initFlatDataForNodesAndChildren(nodes: T[]): void {
        nodes.forEach((node) => {
            this._flatData.push(node);
            const children = this.childrenHandler(node);

            if (children?.length) {
                this.initFlatDataForNodesAndChildren(children);
            }
        });
    }
}
