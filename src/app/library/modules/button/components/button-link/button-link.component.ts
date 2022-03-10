import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { ɵOsBaseButtonComponent } from '../../../../core';

@Component({
    selector: 'os-button-link',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-button-link'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonLinkComponent extends ɵOsBaseButtonComponent {
    constructor(
        injector: Injector
    ) {
        super(injector);
    }
}
