import { EventEmitter, Injectable } from '@angular/core';
import { isNil } from '@lib-helpers';
import { TreeViewComponent } from '../components/tree-view/tree-view.component';
import { ITreeNode } from '../interfaces';

/** Private service */
@Injectable()
export class NodesExpansionService<T> {
    public osExpanded: EventEmitter<ITreeNode<T>> = new EventEmitter();
    public osCollapsed: EventEmitter<ITreeNode<T>> = new EventEmitter();

    private context: TreeViewComponent<T>;
    private stateMap: Map<ITreeNode<T>, boolean> = new Map();

    public _init(context: TreeViewComponent<T>): void {
        this.context = context;

        this.initStateMap();
    }

    public isExpanded(node: ITreeNode<T>): boolean {
        return !!this.stateMap.get(node);
    }

    public expandAll(): void {
        this.setStateForNodesAndChildren(this.context.data, () => true);
    }

    public collapseAll(): void {
        this.setStateForNodesAndChildren(this.context.data, () => false);
    }

    public toggle(node: ITreeNode<T>): void {
        const isNodeExpanded = this.stateMap.get(node);

        this.stateMap.set(node, !isNodeExpanded);
    }

    private setStateForNodesAndChildren(
        nodes: ITreeNode<T>[],
        getState: (node: ITreeNode<T>) => boolean
    ): void {
        nodes.forEach((node) => {
            if (node?.children?.length) {
                const state = getState(node);

                this.stateMap.set(node, state);
                this.setStateForNodesAndChildren(node.children, getState);
            }
        });
    }

    private initStateMap(): void {
        this.setStateForNodesAndChildren(this.context.data, (node) => {
            if (!isNil(node.isExpandedByDefault)) {
                return node.isExpandedByDefault;
            }

            return this.context.isAllNodesExpandedByDefault;
        });
    }
}
