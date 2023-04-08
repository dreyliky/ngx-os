import { Directive } from '@angular/core';

/** Marks element as the header of the TreeView. */
@Directive({
    selector: '[osTreeViewHeader]',
    exportAs: 'osTreeViewHeader'
})
export class TreeViewHeaderDirective {}
