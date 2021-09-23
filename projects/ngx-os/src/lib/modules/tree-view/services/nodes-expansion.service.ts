import { EventEmitter, Injectable } from '@angular/core';
import { isNil } from '@lib-helpers';
import { TreeViewComponent } from '../components/tree-view/tree-view.component';
import { ITreeNode, ITreeNodeExpansionEvent } from '../interfaces';

@Injectable()
export class TreeNodesExpansionService<T> {
    public _osExpanded: EventEmitter<ITreeNodeExpansionEvent<T>> = new EventEmitter();
    public _osCollapsed: EventEmitter<ITreeNodeExpansionEvent<T>> = new EventEmitter();

    private context: TreeViewComponent<T>;
    private stateMap: Map<ITreeNode<T>, boolean> = new Map();

    public _init(context: TreeViewComponent<T>): void {
        this.context = context;

        this.initStateMap();
    }

    /** Checks is node expanded */
    public isExpanded(node: ITreeNode<T>): boolean {
        return !!this.stateMap.get(node);
    }

    /** Expands all nodes */
    public expandAll(): void {
        this.setStateForNodesAndChildren(this.context.data, () => true);
    }

    /** Collapses all nodes */
    public collapseAll(): void {
        this.setStateForNodesAndChildren(this.context.data, () => false);
    }

    /**
     * Expands node
     * @param originalEvent - MouseEvent which is the reason for expansion state changing. Might be undefined if action triggers from code.
     **/
    public expand(node: ITreeNode<T>, originalEvent?: MouseEvent): void {
        this.stateMap.set(node, true);
        this._osExpanded.emit({
            node,
            originalEvent
        });
    }

    /**
     * Collapses node
     * @param originalEvent - MouseEvent which is the reason for expansion state changing. Might be undefined if action triggers from code.
     **/
    public collapse(node: ITreeNode<T>, originalEvent?: MouseEvent): void {
        this.stateMap.set(node, false);
        this._osCollapsed.emit({
            node,
            originalEvent
        });
    }

    /**
     * Expands and collapses node (sets the opposite state)
     * @param originalEvent - MouseEvent which is the reason for expansion state changing. Might be undefined if action triggers from code.
     **/
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
