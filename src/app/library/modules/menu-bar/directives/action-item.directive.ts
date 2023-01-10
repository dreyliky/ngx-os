import { Directive, HostListener } from '@angular/core';
import { MenuBarDirective } from './menu-bar.directive';

@Directive({
    selector: '[osMenuBarAction]',
    exportAs: 'osMenuBarAction'
})
export class MenuBarActionDirective {
    constructor(
        private readonly menuBar: MenuBarDirective
    ) {}

    /** @internal */
    @HostListener('click')
    public _onClick(): void {
        this.menuBar.hide();
    }
}
