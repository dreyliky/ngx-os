import { SelectionItemDirective } from '../directives/selection-item.directive';
import { SelectionZoneDirective } from '../directives/selection-zone.directive';

/** @internal */
export class ɵItemsSelectorHelper {
    private selectionContainerRect: DOMRect;

    constructor(
        private readonly context: SelectionZoneDirective
    ) {}

    public processAll(): void {
        this.selectionContainerRect = this.context._containerElement.getBoundingClientRect();

        this.context._selectionItems
            .forEach((item) => this.processSelectionItem(item));
    }

    private processSelectionItem(item: SelectionItemDirective): void {
        const currentItemSelection = this.isItemIntersectsSelectionZone(item);

        if (currentItemSelection !== item.isSelected) {
            this.toggleItemSelection(item, currentItemSelection);
        }
    }

    private toggleItemSelection(item: SelectionItemDirective, shouldBeSelected: boolean): void {
        if (shouldBeSelected) {
            item._select();
        } else {
            item._deselect();
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
