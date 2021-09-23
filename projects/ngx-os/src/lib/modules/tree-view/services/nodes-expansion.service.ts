import { EventEmitter, Injectable } from '@angular/core';
import { isNil } from '@lib-helpers';
import { TreeViewComponent } from '../components/tree-view/tree-view.component';
import { ITreeNode, ITreeNodeExpansionEvent } from '../interfaces';

/** @internal */
@Injectable()
export class NodesExpansionService<T> {
    public osExpanded: EventEmitter<ITreeNodeExpansionEvent<T>> = new EventEmitter();
    public osCollapsed: EventEmitter<ITreeNodeExpansionEvent<T>> = new EventEmitter();

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

    public expand(node: ITreeNode<T>, originalEvent?: MouseEvent): void {
        this.stateMap.set(node, true);
        this.osExpanded.emit({
            node,
            originalEvent
        });
    }

    public collapse(node: ITreeNode<T>, originalEvent?: MouseEvent): void {
        this.stateMap.set(node, false);
        this.osCollapsed.emit({
            node,
            originalEvent
        });
    }

    public toggle(node: ITreeNode<T>, originalEvent?: MouseEvent): void {
        const isNodeExpanded = this.stateMap.get(node);

        if (isNodeExpanded) {
            this.collapse(node, originalEvent);
        } else {
            this.expand(node, originalEvent);
        }
    }

    private setStateForNodesAndChildren(
        nodes: ITreeNode<T>[],
        getState: (node: ITreeNode<T>) => boolean
    ): void {
        nodes.forEach((node) => {
            if (node?.children?.length) {
                const newState = getState(node);
                const currentState = this.stateMap.get(node);

                if (!isNil(newState) && (newState !== currentState)) {
                    (newState) ? this.expand(node) : this.collapse(node);
                }

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
