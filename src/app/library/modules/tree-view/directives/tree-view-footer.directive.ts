import { Directive } from '@angular/core';

/** Marks element as the footer of the TreeView. */
@Directive({
    selector: '[osTreeViewFooter]',
    exportAs: 'osTreeViewFooter'
})
export class TreeViewFooterDirective {}
