import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';
import { TreeNode } from '../../interfaces';

@Component({
    selector: 'os-tree-view',
    templateUrl: './tree-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeViewComponent extends OsBaseComponent {

    @Input()
    public set data(value: TreeNode<any>[]) {
        if (value) {
            this.prepareData(value);
        }
    }

    public get data(): TreeNode<any>[] {
        return this._data;
    }

    private _data: TreeNode<any>[];

    constructor() {
        super();
    }

    private prepareData(data: TreeNode<any>[]): void {
        this._data = data
            .map((treeNode) => this.setParentForNodeAndChildren(treeNode));
    }

    private setParentForNodeAndChildren(node: TreeNode<any>, parent: TreeNode<any> = null): TreeNode<any> {
        const targetNode = { ...node };

        targetNode.parent = parent;

        if (node.children && node.children.length) {
            targetNode.children = node.children
                .map((childNode) => {
                    childNode.parent = targetNode;

                    childNode = this.setParentForNodeAndChildren(childNode, targetNode);

                    return childNode;
                });
        }

        return targetNode;
    }

}
