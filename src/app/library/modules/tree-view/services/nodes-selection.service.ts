import { EventEmitter, Injectable } from '@angular/core';
import { isNil } from '../../../core';
import { ITreeNode, ITreeNodeSelectionEvent } from '../interfaces';
import { TreeNodesState } from '../states';

/** Must be used only via {@link TreeViewComponent}. Please don't inject it directly */
@Injectable()
export class TreeNodesSelectionService<T> {
    public _osSelected: EventEmitter<ITreeNodeSelectionEvent<T>> = new EventEmitter();
    public _osDeselected: EventEmitter<ITreeNodeSelectionEvent<T>> = new EventEmitter();

    constructor(
        private readonly state: TreeNodesState<T>
    ) {}

    public _initDefaultStateForAll(): void {
        this.setStateForNodes((node) => !!node.isSelected);
    }

    /** Returns all selected nodes */
    public getAllSelected(): ITreeNode<T>[] {
        return this.state.flatData
            .filter(({ isSelected }) => isSelected);
    }

    /**
     * Selects node
     * @param originalEvent - MouseEvent which is the reason for selection state changing. Might be undefined if action triggers from code.
     **/
    public select(node: ITreeNode<T>, originalEvent?: MouseEvent): void {
        node.isSelected = true;
        const allSelected = this.getAllSelected();

        this._osSelected.emit({ originalEvent, node, allSelected });
        node.onSelected?.({ originalEvent, node, allSelected });
    }

    /**
     * Deselects node
     * @param originalEvent - Event which is the reason for selection state changing. Might be undefined if action triggers from code.
     **/
    public deselect(node: ITreeNode<T>, originalEvent?: MouseEvent): void {
        node.isSelected = false;
        const allSelected = this.getAllSelected();

        this._osDeselected.emit({ originalEvent, node, allSelected });
        node.onDeselected?.({ originalEvent, node, allSelected });
    }

    /**
     * Selects and deselects node (sets the opposite state)
     * @param originalEvent - MouseEvent which is the reason for selection state changing. Might be undefined if action triggers from code.
     **/
    public toggle(node: ITreeNode<T>, originalEvent?: MouseEvent): void {
        if (node.isSelected) {
            this.deselect(node, originalEvent);
        } else {
            this.select(node, originalEvent);
        }
    }

    /** Deselects all nodes except specific one */
    public deselectAllExceptSpecific(node: ITreeNode<T>): void {
        this.state.flatData.forEach((currentNode) => {
            if (currentNode.isSelected && currentNode !== node) {
                this.deselect(currentNode);
            }
        });
    }

    private setStateForNodes(getState: (node: ITreeNode<T>) => boolean): void {
        this.state.flatData.forEach((node) => {
            const newState = getState(node);

            if (!isNil(newState) && (newState !== node.isSelected)) {
                (newState) ? this.select(node) : this.deselect(node);
            }
        });
    }
}
