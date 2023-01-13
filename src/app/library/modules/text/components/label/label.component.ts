import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ɵOsBaseViewComponent } from '../../../../core';

@Component({
    selector: 'os-label',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-label os-text'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelComponent extends ɵOsBaseViewComponent {}
