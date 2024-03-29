import {
    ChangeDetectionStrategy,
    Component,
    HostListener,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseViewComponent } from '../../../../core';
import { ɵMenuBarActiveButtonState } from '../../states';

@Component({
    selector: 'os-menu-bar',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-menu-bar'
    },
    exportAs: 'osMenuBarComponent',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        ɵMenuBarActiveButtonState
    ]
})
export class MenuBarComponent extends ɵOsBaseViewComponent {
    constructor(
        private readonly menuBarActiveButtonState: ɵMenuBarActiveButtonState
    ) {
        super();
    }

    /** Close currently opened MenuBar container */
    public close(): void {
        this.menuBarActiveButtonState.clear();
    }

    @HostListener('contextmenu', ['$event'])
    protected _onContextMenuEvent(event: PointerEvent): void {
        event.preventDefault();
    }
}
