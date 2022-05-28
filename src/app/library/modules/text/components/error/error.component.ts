import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ɵOsBaseComponent } from '../../../../core';

@Component({
    selector: 'os-error',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-error'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent extends ɵOsBaseComponent {}
