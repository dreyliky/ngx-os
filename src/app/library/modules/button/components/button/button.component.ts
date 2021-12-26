import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { ɵOsBaseButtonComponent } from '../../../../core';

@Component({
    selector: 'os-button',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-button'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent extends ɵOsBaseButtonComponent {
    constructor(
        injector: Injector
    ) {
        super(injector);
    }
}
