import { EventEmitter, Injectable } from '@angular/core';
import { isNil } from '@lib-helpers';
import { TreeViewComponent } from '../components/tree-view/tree-view.component';
import { ITreeNode, ITreeNodeSelectionEvent } from '../interfaces';

/** Private service */
@Injectable()
export class NodesSelectionService<T> {
    public osSelected: EventEmitter<ITreeNodeSelectionEvent<T>> = new EventEmitter();
    public osDeselected: EventEmitter<ITreeNodeSelectionEvent<T>> = new EventEmitter();

    private context: TreeViewComponent<T>;
    private stateMap: Map<ITreeNode, boolean> = new Map();

    public _init(context: TreeViewComponent<T>): void {
        this.context = context;

        this.initStateMap();
    }

    public getAllSelected(): ITreeNode<T>[] {
        return [...this.stateMap.entries()]
            .filter(([, state]) => state)
            .map(([node]) => node);
    }

    public isSelected(node: ITreeNode<T>): boolean {
        return !!this.stateMap.get(node);
    }

    public select(node: ITreeNode<T>): void {
        this.stateMap.set(node, true);
        this.osSelected.emit({
            target: node,
            allSelected: this.getAllSelected()
        });
    }

    public deselect(node: ITreeNode<T>): void {
        this.stateMap.set(node, false);
        this.osDeselected.emit({
            target: node,
            allSelected: this.getAllSelected()
        });
    }

    public toggle(node: ITreeNode<T>): void {
        (this.isSelected(node)) ? this.deselect(node) : this.select(node);
    }

    public deselectAllExceptSpecific(node: ITreeNode<T>): void {
        this.stateMap.forEach((state, currNode) => {
            if (state && currNode !== node) {
                this.deselect(currNode);
            }
        });
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
            return (!isNil(node.isSelectedByDefault)) ? node.isSelectedByDefault : false;
        });
    }
}
