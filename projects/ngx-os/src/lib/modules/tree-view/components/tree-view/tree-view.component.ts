import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { OsBaseComponent } from '@lib-core';
import { TreeNode } from '../../interfaces';

@Component({
    selector: 'os-tree-view',
    templateUrl: './tree-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeViewComponent<T> extends OsBaseComponent implements OnInit {
    @Input()
    public set data(value: TreeNode<T>[]) {
        if (value) {
            this.prepareData(value);
        }
    }

    public get data(): TreeNode<T>[] {
        return this._data;
    }

    private nodesExpandableStateMap: Map<TreeNode<T>, boolean> = new Map();
    private nodesSelectedStateMap: Map<TreeNode<T>, boolean> = new Map();

    private _data: TreeNode<T>[];

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-tree-view');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }

    public onNodeClick(node: TreeNode<T>): void {
        const isNodeSelected = this.nodesSelectedStateMap.get(node);

        this.nodesSelectedStateMap.set(node, !isNodeSelected);
    }

    public onToggleExpandButtonClick(event: MouseEvent, node: TreeNode<T>): void {
        if (node.children?.length) {
            const isNodeExpanded = this.nodesExpandableStateMap.get(node);

            this.nodesExpandableStateMap.set(node, !isNodeExpanded);
        }

        event.stopPropagation();
    }

    public isNodeSelected(node: TreeNode<T>): boolean {
        return this.nodesSelectedStateMap.get(node);
    }

    public isNodeExpanded(node: TreeNode<T>): boolean {
        return this.nodesExpandableStateMap.get(node);
    }

    private prepareData(data: TreeNode<T>[]): void {
        this._data = data
            .map((treeNode) => this.setParentForNodeAndChildren(treeNode));
    }

    private setParentForNodeAndChildren(
        node: TreeNode<T>,
        parent: TreeNode<T> = null
    ): TreeNode<T> {
        const targetNode = { ...node, parent };

        if (node.children?.length) {
            targetNode.children = node.children.map((childNode, nodeIndex) => {
                childNode.parent = targetNode;

                node.children[nodeIndex] = this.setParentForNodeAndChildren(childNode, targetNode);

                return childNode;
            });
        }

        return targetNode;
    }
}
