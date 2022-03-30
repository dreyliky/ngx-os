import { Observable, Subject } from 'rxjs';
import { SelectionItemDirective } from '../directives/selection-item.directive';
import { SelectionZoneDirective } from '../directives/selection-zone.directive';

/** @internal */
export class ɵItemsSelectorHelper<T = any> {
    public get selectedItems$(): Observable<T[]> {
        return this._selectedItems$.asObservable();
    }

    private selectionContainerRect: DOMRect;

    private isItemsSelectionChanged = false;
    private selectedItemsMap = new Map<T, boolean>();
    private _selectedItems$ = new Subject<T[]>();

    constructor(
        private readonly context: SelectionZoneDirective<T>
    ) {}

    public onSelection(): void {
        this.isItemsSelectionChanged = false;
        this.selectionContainerRect = this.context._containerElement.getBoundingClientRect();

        this.context._selectionItems
            .forEach((item) => this.processSelectionItem(item));

        this.emitSelectedItemsIfSelectionChanged();
    }

    public onDeselection(): void {
        if (this.selectedItemsMap.size) {
            this.isItemsSelectionChanged = true;

            this.selectedItemsMap.clear();
            this.emitSelectedItemsIfSelectionChanged();
        }
    }

    public onDestroy(): void {
        this.selectedItemsMap.clear();
    }

    private processSelectionItem(item: SelectionItemDirective): void {
        const currentItemSelection = this.isItemIntersectsSelectionZone(item);

        if (currentItemSelection !== item.isSelected) {
            this.toggleItemSelection(item, currentItemSelection);

            this.isItemsSelectionChanged = true;
        }
    }

    private toggleItemSelection(item: SelectionItemDirective<T>, shouldBeSelected: boolean): void {
        if (shouldBeSelected) {
            item._select();
            this.selectedItemsMap.set(item.data, true);
        } else {
            item._deselect();
            this.selectedItemsMap.delete(item.data);
        }
    }

    private emitSelectedItemsIfSelectionChanged(): void {
        if (this.isItemsSelectionChanged) {
            const items = [...this.selectedItemsMap.keys()];

            this._selectedItems$.next(items);
        }
    }

    private isItemIntersectsSelectionZone(item: SelectionItemDirective): boolean {
        const itemRect = item.htmlElement.getBoundingClientRect();

        return (
            itemRect.left < this.selectionContainerRect.right &&
            itemRect.right > this.selectionContainerRect.left &&
            itemRect.top < this.selectionContainerRect.bottom &&
            itemRect.bottom > this.selectionContainerRect.top
        );
    }
}
