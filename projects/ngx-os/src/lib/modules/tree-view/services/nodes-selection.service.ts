import { EventEmitter, Injectable } from '@angular/core';
import { isNil } from '@lib-helpers';
import { TreeViewComponent } from '../components/tree-view/tree-view.component';
import { ITreeNode, ITreeNodeSelectionEvent } from '../interfaces';

/** @internal */
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

    public select(node: ITreeNode<T>, originalEvent?: MouseEvent): void {
        this.stateMap.set(node, true);
        this.osSelected.emit({
            originalEvent,
            target: node,
            allSelected: this.getAllSelected()
        });
    }

    public deselect(node: ITreeNode<T>, originalEvent?: MouseEvent): void {
        this.stateMap.set(node, false);
        this.osDeselected.emit({
            originalEvent,
            target: node,
            allSelected: this.getAllSelected()
        });
    }

    public toggle(node: ITreeNode<T>, originalEvent?: MouseEvent): void {
        if (this.isSelected(node)) {
            this.deselect(node, originalEvent);
        } else {
            this.select(node, originalEvent);
        }
    }

    public deselectAllExceptSpecific(node: ITreeNode<T>, originalEvent?: MouseEvent): void {
        this.stateMap.forEach((state, currNode) => {
            if (state && currNode !== node) {
                this.deselect(currNode, originalEvent);
            }
        });
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
                    (newState) ? this.select(node) : this.deselect(node);
                }
            }
        });
    }

    private initStateMap(): void {
        this.setStateForNodesAndChildren(this.context.data, (node) => {
            return (!isNil(node.isSelectedByDefault)) ? node.isSelectedByDefault : false;
        });
    }
}
