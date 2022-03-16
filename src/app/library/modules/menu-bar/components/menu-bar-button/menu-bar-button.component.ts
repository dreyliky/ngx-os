import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ɵOsBaseButtonComponent } from '../../../../core';

@Component({
    selector: 'os-menu-bar-button',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-menu-bar-button'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuBarButtonComponent extends ɵOsBaseButtonComponent {}
