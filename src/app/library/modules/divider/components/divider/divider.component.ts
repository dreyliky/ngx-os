import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ɵOsBaseViewComponent } from '../../../../core';

@Component({
    selector: 'os-divider',
    template: '',
    host: {
        'class': 'os-divider'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DividerComponent extends ɵOsBaseViewComponent {}
