import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { ɵTreeNodesState } from '../states';

/** Must be used only via {@link TreeViewComponent}. Please don't inject it directly */
@Injectable()
export class TreeNodesSelectionService<T = any> implements OnDestroy {
    /** @internal */
    public _osSelected: EventEmitter<T> = new EventEmitter();
    /** @internal */
    public _osDeselected: EventEmitter<T> = new EventEmitter();

    private _stateMap = new Map<T, boolean>();

    constructor(
        private readonly state: ɵTreeNodesState<T>
    ) {}

    public ngOnDestroy(): void {
        this._stateMap.clear();
    }

    /** Check is node selected */
    public check(node: T): boolean {
        return !!this._stateMap.get(node);
    }

    /** Returns all selected nodes */
    public getAllSelected(): T[] {
        return this.state.flatData
            .filter((node) => this.check(node));
    }

    /**
     * Selects node
     * @param node - The node to select
     **/
    public select(node: T): void {
        this._stateMap.set(node, true);
        this._osSelected.emit(node);
    }

    /**
     * Deselects node
     * @param node - The node to deselect
     **/
    public deselect(node: T): void {
        this._stateMap.delete(node);
        this._osDeselected.emit(node);
    }

    /**
     * Selects and deselects node (sets the opposite state)
     * @param node - The node to toggle
     **/
    public toggle(node: T): void {
        if (this.check(node)) {
            this.deselect(node);
        } else {
            this.select(node);
        }
    }

    /** Deselects all nodes except specific one */
    public deselectAllExceptSpecific(node: T): void {
        this.state.flatData.forEach((currentNode) => {
            if (this.check(currentNode) && currentNode !== node) {
                this.deselect(currentNode);
            }
        });
    }
}
