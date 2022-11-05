import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostListener,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseComponent } from '../../../../core';
import { MenuBarButtonComponent } from '../button/button.component';

@Component({
    selector: 'os-menu-bar',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-menu-bar'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuBarComponent extends ɵOsBaseComponent {
    /** @internal */
    @Output()
    public activeButtonChange: EventEmitter<MenuBarButtonComponent> = new EventEmitter();

    /** @internal */
    public get activeButton(): MenuBarButtonComponent {
        return this._activeButton;
    }

    private _activeButton: MenuBarButtonComponent | null = null;

    /** @internal */
    @HostListener('contextmenu', ['$event'])
    public _onContextMenuEvent(event: PointerEvent): void {
        event.preventDefault();
    }

    /** @internal */
    public _openMenuBar(buttonComponent: MenuBarButtonComponent): void {
        this._activeButton = buttonComponent;
        this._activeButton._setIsActive(true);

        this.activeButtonChange.emit(this.activeButton);
    }

    /** @internal */
    public _hideAllMenuBars(): void {
        const activeButtonToReset = this._activeButton;
        this._activeButton = null;

        activeButtonToReset?._setIsActive(false);
        this.activeButtonChange.emit(this.activeButton);
    }
}
