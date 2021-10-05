import { EventEmitter, Injectable } from '@angular/core';
import { isNil } from '../../../core';
import { ITreeNode, ITreeNodeExpansionEvent } from '../interfaces';
import { TreeNodesState } from '../states';

@Injectable()
export class TreeNodesExpansionService<T> {
    public _osExpanded: EventEmitter<ITreeNodeExpansionEvent<T>> = new EventEmitter();
    public _osCollapsed: EventEmitter<ITreeNodeExpansionEvent<T>> = new EventEmitter();

    constructor(
        private readonly state: TreeNodesState<T>
    ) {}

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
    public expand(node: ITreeNode<T>, originalEvent?: MouseEvent): void {
        node.isExpanded = true;

        this._osExpanded.emit({ node, originalEvent });
        node.onExpanded?.({ node, originalEvent });
    }

    /**
     * Collapses node
     * @param originalEvent - MouseEvent which is the reason for expansion state changing. Might be undefined if action triggers from code.
     **/
    public collapse(node: ITreeNode<T>, originalEvent?: MouseEvent): void {
        node.isExpanded = false;

        this._osCollapsed.emit({ node, originalEvent });
        node.onCollapsed?.({ node, originalEvent });
    }

    /**
     * Expands and collapses node (sets the opposite state)
     * @param originalEvent - MouseEvent which is the reason for expansion state changing. Might be undefined if action triggers from code.
     **/
    public toggle(node: ITreeNode<T>, originalEvent?: MouseEvent): void {
        if (node.isExpanded) {
            this.collapse(node, originalEvent);
        } else {
            this.expand(node, originalEvent);
        }
    }

    private setStateForAll(getState: (node: ITreeNode<T>) => boolean): void {
        this.state.flatData.forEach((node) => {
            const newState = getState(node);

            if (!isNil(newState) && (newState !== node.isExpanded)) {
                (newState) ? this.expand(node) : this.collapse(node);
            }
        });
    }
}
