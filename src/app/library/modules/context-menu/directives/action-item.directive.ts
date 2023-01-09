import { Directive, HostListener } from '@angular/core';
import { ContextMenuDirective } from './context-menu.directive';

@Directive({
    selector: '[osContextMenuAction]',
    exportAs: 'osContextMenuAction'
})
export class ContextMenuActionDirective {
    constructor(
        private readonly contextMenu: ContextMenuDirective
    ) {}

    /** @internal */
    @HostListener('click')
    public _onClick(): void {
        this.contextMenu.hide();
    }
}
