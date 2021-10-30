import { EventEmitter, Injectable } from '@angular/core';
import { isNil } from '../../../core';
import { TreeNode, TreeNodeExpansionEvent } from '../interfaces';
import { TreeNodesState } from '../states';

/** Must be used only via {@link TreeViewComponent}. Please don't inject it directly. */
@Injectable()
export class TreeNodesExpansionService<T> {
    /** @internal */
    public _osExpanded: EventEmitter<TreeNodeExpansionEvent<T>> = new EventEmitter();
    /** @internal */
    public _osCollapsed: EventEmitter<TreeNodeExpansionEvent<T>> = new EventEmitter();

    constructor(
        private readonly state: TreeNodesState<T>
    ) {}

    /** @internal */
    public _initDefaultStateForAll(commonDefaultState: boolean): void {
        this.setStateForAll((node) => (
            (!isNil(node.isExpanded)) ? node.isExpanded : commonDefaultState
        ));
    }

    /** Expands all nodes */
    public expandAll(): void {
        this.setStateForAll(() => true);
    }

    /** Collapses all nodes */
    public collapseAll(): void {
        this.setStateForAll(() => false);
    }

    /**
     * Expands node
     * @param originalEvent - MouseEvent which is the reason for expansion state changing. Might be undefined if action triggers from code.
     **/
    public expand(node: TreeNode<T>, originalEvent?: MouseEvent): void {
        node.isExpanded = true;

        this._osExpanded.emit({ node, originalEvent });
        node.onExpanded?.({ node, originalEvent });
    }

    /**
     * Collapses node
     * @param originalEvent - MouseEvent which is the reason for expansion state changing. Might be undefined if action triggers from code.
     **/
    public collapse(node: TreeNode<T>, originalEvent?: MouseEvent): void {
        node.isExpanded = false;

        this._osCollapsed.emit({ node, originalEvent });
        node.onCollapsed?.({ node, originalEvent });
    }

    /**
     * Expands and collapses node (sets the opposite state)
     * @param originalEvent - MouseEvent which is the reason for expansion state changing. Might be undefined if action triggers from code.
     **/
    public toggle(node: TreeNode<T>, originalEvent?: MouseEvent): void {
        if (node.isExpanded) {
            this.collapse(node, originalEvent);
        } else {
            this.expand(node, originalEvent);
        }
    }

    private setStateForAll(getState: (node: TreeNode<T>) => boolean): void {
        this.state.flatData.forEach((node) => {
            const newState = getState(node);

            if (!isNil(newState) && (newState !== node.isExpanded)) {
                (newState) ? this.expand(node) : this.collapse(node);
            }
        });
    }
}
