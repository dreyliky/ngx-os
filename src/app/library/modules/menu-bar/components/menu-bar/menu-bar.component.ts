import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseComponent } from '../../../../core';
import { MenuBarButtonComponent } from '../menu-bar-button';

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
    @ContentChildren(MenuBarButtonComponent)
    private readonly menuBarButtons: QueryList<MenuBarButtonComponent>;
}
