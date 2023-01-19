import { EventEmitter, Injectable } from '@angular/core';
import { ɵIsNil } from '../../../core';
import { TreeNode, TreeNodeSelectionEvent } from '../interfaces';
import { ɵTreeNodesState } from '../states';

/** Must be used only via {@link TreeViewComponent}. Please don't inject it directly */
@Injectable()
export class TreeNodesSelectionService<T = any> {
    /** @internal */
    public _osSelected: EventEmitter<TreeNodeSelectionEvent<T>> = new EventEmitter();
    /** @internal */
    public _osDeselected: EventEmitter<TreeNodeSelectionEvent<T>> = new EventEmitter();

    private _stateMap = new Map<T, boolean>();

    constructor(
        private readonly state: ɵTreeNodesState<T>
    ) {}

    /** @internal */
    public _initDefaultStateForAll(): void {
        this.setStateForNodes((node) => !!node.isSelected);
    }

    public check(node: T): boolean {
        return this._stateMap.get(node);
    }

    /** Returns all selected nodes */
    public getAllSelected(): T[] {
        return this.state.flatData
            .filter((node) => this.check(node));
    }

    /**
     * Selects node
     * @param originalEvent - PointerEvent which is the reason for selection state changing. Might be undefined if action triggers from code.
     **/
    public select(node: T, originalEvent?: MouseEvent): void {
        const allSelected = this.getAllSelected();

        this._stateMap.set(node, true);
        this._osSelected.emit({ originalEvent, node, allSelected });
    }

    /**
     * Deselects node
     * @param originalEvent - Event which is the reason for selection state changing. Might be undefined if action triggers from code.
     **/
    public deselect(node: T, originalEvent?: MouseEvent): void {
        const allSelected = this.getAllSelected();

        this._stateMap.delete(node);
        this._osDeselected.emit({ originalEvent, node, allSelected });
    }

    /**
     * Selects and deselects node (sets the opposite state)
     * @param originalEvent - PointerEvent which is the reason for selection state changing. Might be undefined if action triggers from code.
     **/
    public toggle(node: T, originalEvent?: MouseEvent): void {
        if (this.check(node)) {
            this.deselect(node, originalEvent);
        } else {
            this.select(node, originalEvent);
        }
    }

    /** Deselects all nodes except specific one */
    public deselectAllExceptSpecific(node: TreeNode<T>): void {
        this.state.flatData.forEach((currentNode) => {
            if (this.check(currentNode) && currentNode !== node) {
                this.deselect(currentNode);
            }
        });
    }

    private setStateForNodes(getState: (node: TreeNode<T>) => boolean): void {
        this.state.flatData.forEach((node) => {
            const newState = getState(node);

            if (!ɵIsNil(newState) && (newState !== this.check(node))) {
                (newState) ? this.select(node) : this.deselect(node);
            }
        });
    }
}
