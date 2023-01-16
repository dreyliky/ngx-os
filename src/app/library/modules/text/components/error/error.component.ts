import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ɵOsBaseViewComponent } from '../../../../core';

@Component({
    selector: 'os-error',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-error'
    },
    exportAs: 'osError',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent extends ɵOsBaseViewComponent {}
