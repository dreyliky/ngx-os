import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { ɵOsBaseComponent } from '../../../../core';

@Component({
    selector: 'os-text',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-text'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent extends ɵOsBaseComponent {
    constructor(
        injector: Injector
    ) {
        super(injector);
    }
}
