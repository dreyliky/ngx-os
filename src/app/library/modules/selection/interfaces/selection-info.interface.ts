import { SelectionItemDirective } from '../directives';

export interface SelectionInfo<T = any> {
    readonly selectedItems: SelectionItemDirective<T>[];
    readonly deselectedItems: SelectionItemDirective<T>[];
    readonly originalEvent: PointerEvent;
}
