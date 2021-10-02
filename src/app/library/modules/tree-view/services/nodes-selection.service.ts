import { EventEmitter, Injectable } from '@angular/core';
import { isNil } from '../../../core';
import { TreeViewComponent } from '../components/tree-view/tree-view.component';
import { ITreeNode, ITreeNodeSelectionEvent } from '../interfaces';

@Injectable()
export class TreeNodesSelectionService<T> {
    public _osSelected: EventEmitter<ITreeNodeSelectionEvent<T>> = new EventEmitter();
    public _osDeselected: EventEmitter<ITreeNodeSelectionEvent<T>> = new EventEmitter();

    private context: TreeViewComponent<T>;
    private stateMap: Map<ITreeNode, boolean> = new Map();

    public _init(context: TreeViewComponent<T>): void {
        this.context = context;

        this.initStateMap();
    }

    /** Returns all selected nodes */
    public getAllSelected(): ITreeNode<T>[] {
        return [...this.stateMap.entries()]
            .filter(([, state]) => state)
            .map(([node]) => node);
    }

    /** Checks is node selected */
    public isSelected(node: ITreeNode<T>): boolean {
        return !!this.stateMap.get(node);
    }

    /**
     * Selects node
     * @param originalEvent - MouseEvent which is the reason for selection state changing. Might be undefined if action triggers from code.
     **/
    public select(node: ITreeNode<T>, originalEvent?: MouseEvent): void {
        this.stateMap.set(node, true);
        this._osSelected.emit({
            originalEvent,
            node: node,
            allSelected: this.getAllSelected()
        });
    }

    /**
     * Deselects node
     * @param originalEvent - Event which is the reason for selection state changing. Might be undefined if action triggers from code.
     **/
    public deselect(node: ITreeNode<T>, originalEvent?: MouseEvent): void {
        this.stateMap.set(node, false);
        this._osDeselected.emit({
            originalEvent,
            node: node,
            allSelected: this.getAllSelected()
        });
    }

    /**
     * Selects and deselects node (sets the opposite state)
     * @param originalEvent - MouseEvent which is the reason for selection state changing. Might be undefined if action triggers from code.
     **/
    public toggle(node: ITreeNode<T>, originalEvent?: MouseEvent): void {
        if (this.isSelected(node)) {
            this.deselect(node, originalEvent);
        } else {
            this.select(node, originalEvent);
        }
    }

    /** Deselects all nodes except specific one */
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
