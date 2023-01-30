import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { ɵTreeNodesState } from '../states';

/** Must be used only via {@link TreeViewComponent}. Please don't inject it directly. */
@Injectable()
export class TreeNodesExpansionService<T = any> implements OnDestroy {
    /** @internal */
    public _osExpanded: EventEmitter<T> = new EventEmitter();
    /** @internal */
    public _osCollapsed: EventEmitter<T> = new EventEmitter();

    /** @internal */
    private readonly _stateMap = new Map<T, boolean>();

    constructor(
        private readonly state: ɵTreeNodesState<T>
    ) {}

    public ngOnDestroy(): void {
        this._stateMap.clear();
    }

    /** Check is node expanded */
    public check(node: T): boolean {
        return !!this._stateMap.get(node);
    }

    /** Expands all nodes */
    public expandAll(): void {
        this.setStateForAll(true);
    }

    /** Collapses all nodes */
    public collapseAll(): void {
        this.setStateForAll(false);
    }

    /**
     * Expands node
     * @param node - The node to expand
     **/
    public expand(node: T): void {
        this._stateMap.set(node, true);
        this._osExpanded.emit(node);
    }

    /**
     * Collapses node
     * @param node - The node to collapse
     **/
    public collapse(node: T): void {
        this._stateMap.delete(node);
        this._osCollapsed.emit(node);
    }

    /**
     * Expands and collapses node (sets the opposite state)
     * @param node - The node to toggle
     **/
    public toggle(node: T): void {
        if (this._stateMap.get(node)) {
            this.collapse(node);
        } else {
            this.expand(node);
        }
    }

    private setStateForAll(state: boolean): void {
        this.state.flatData.forEach((node) => {
            if ((state !== this.check(node))) {
                (state) ? this.expand(node) : this.collapse(node);
            }
        });
    }
}
