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
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        ɵMenuBarActiveButtonState
    ]
})
export class MenuBarComponent extends ɵOsBaseViewComponent {
    /** @internal */
    @HostListener('contextmenu', ['$event'])
    public _onContextMenuEvent(event: PointerEvent): void {
        event.preventDefault();
    }
}
