import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostListener,
    Injector,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseComponent } from '../../../../core';
import { MenuBarButtonComponent } from '../button';

@Component({
    selector: 'os-menu-bar',
    template: '<ng-content select="os-menu-bar-button"></ng-content>',
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

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    /** @internal */
    @HostListener('contextmenu', ['$event'])
    public _onContextMenuEvent(event: PointerEvent): void {
        event.preventDefault();
    }

    /** @internal */
    public _setActiveButtonComponent(buttonComponent: MenuBarButtonComponent): void {
        this._activeButton = buttonComponent;
        this._activeButton._setIsActive(true);

        this.activeButtonChange.emit(this.activeButton);
    }

    /** @internal */
    public _resetActiveButtonComponent(): void {
        const activeButtonToReset = this._activeButton;
        this._activeButton = null;

        activeButtonToReset._setIsActive(false);
        this.activeButtonChange.emit(this.activeButton);
    }
}
