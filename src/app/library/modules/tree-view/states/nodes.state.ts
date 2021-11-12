import { Injectable } from '@angular/core';
import { TreeNode } from '../interfaces';

/** @internal */
@Injectable()
export class TreeNodesState<T = any> {
    /** Original data tree of nodes */
    public get data(): TreeNode<T>[] {
        return this._data;
    }

    /** Flat array of all nodes. Parents and children on the same level here */
    public get flatData(): TreeNode<T>[] {
        return this._flatData;
    }

    private _data: TreeNode<T>[] = [];
    private _flatData: TreeNode<T>[] = [];

    public set(data: TreeNode<T>[]): void {
        this._data = data;
        this._flatData = [];

        this.initFlatDataForNodesAndChildren(data);
    }

    private initFlatDataForNodesAndChildren(nodes: TreeNode[]): void {
        nodes.forEach((node) => {
            this._flatData.push(node);

            if (node.children?.length) {
                this.initFlatDataForNodesAndChildren(node.children);
            }
        });
    }
}
