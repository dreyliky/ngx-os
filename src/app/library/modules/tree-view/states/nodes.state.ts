import { Injectable } from '@angular/core';
import { ITreeNode } from '../interfaces';

/** @internal */
@Injectable()
export class TreeNodesState<T> {
    /** Original data tree of nodes */
    public get data(): ITreeNode<T>[] {
        return this._data;
    }

    /** Flat array of all nodes. Parents and children on the same level here */
    public get flatData(): ITreeNode<T>[] {
        return this._flatData;
    }

    private _data: ITreeNode<T>[] = [];
    private _flatData: ITreeNode<T>[] = [];

    public set(data: ITreeNode<T>[]): void {
        this._data = data;
        this._flatData = [];

        this.initFlatDataForNodesAndChildren(data);
    }

    private initFlatDataForNodesAndChildren(nodes: ITreeNode[]): void {
        nodes.forEach((node) => {
            this._flatData.push(node);

            if (node.children?.length) {
                this.initFlatDataForNodesAndChildren(node.children);
            }
        });
    }
}
