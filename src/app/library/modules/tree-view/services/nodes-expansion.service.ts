import { EventEmitter, Injectable } from '@angular/core';
import { ɵIsNil } from '../../../core';
import { TreeNodeExpansionEvent } from '../interfaces';
import { ɵTreeNodesState } from '../states';

/** Must be used only via {@link TreeViewComponent}. Please don't inject it directly. */
@Injectable()
export class TreeNodesExpansionService<T = any> {
    /** @internal */
    public _osExpanded: EventEmitter<TreeNodeExpansionEvent<T>> = new EventEmitter();
    /** @internal */
    public _osCollapsed: EventEmitter<TreeNodeExpansionEvent<T>> = new EventEmitter();

    /** @internal */
    private readonly _stateMap = new Map<T, boolean>();

    constructor(
        private readonly state: ɵTreeNodesState<T>
    ) {}

    /** @internal */
    public _initDefaultStateForAll(commonDefaultState: boolean): void {
        this.setStateForAll((node) => (
            (!ɵIsNil(this._stateMap.get(node))) ? this._stateMap.get(node) : commonDefaultState
        ));
    }

    public check(node: T): boolean {
        return !!this._stateMap.get(node);
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
     * @param originalEvent - PointerEvent which is the reason for expansion state changing. Might be undefined if action triggers from code.
     **/
    public expand(node: T, originalEvent?: PointerEvent): void {
        this._stateMap.set(node, true);
        this._osExpanded.emit({ node, originalEvent });
    }

    /**
     * Collapses node
     * @param originalEvent - PointerEvent which is the reason for expansion state changing. Might be undefined if action triggers from code.
     **/
    public collapse(node: T, originalEvent?: PointerEvent): void {
        this._stateMap.delete(node);
        this._osCollapsed.emit({ node, originalEvent });
    }

    /**
     * Expands and collapses node (sets the opposite state)
     * @param originalEvent - PointerEvent which is the reason for expansion state changing. Might be undefined if action triggers from code.
     **/
    public toggle(node: T, originalEvent?: PointerEvent): void {
        if (this._stateMap.get(node)) {
            this.collapse(node, originalEvent);
        } else {
            this.expand(node, originalEvent);
        }
    }

    private setStateForAll(getState: (node: T) => boolean): void {
        this.state.flatData.forEach((node) => {
            const newState = getState(node);

            if (!ɵIsNil(newState) && (newState !== this._stateMap.get(node))) {
                (newState) ? this.expand(node) : this.collapse(node);
            }
        });
    }
}
