import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ɵOsBaseViewComponent } from '../../../../core';

/** A divider component is a thin line that groups content in lists and layouts. */
@Component({
    selector: 'os-divider',
    template: '',
    host: {
        'class': 'os-divider'
    },
    exportAs: 'osDivider',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DividerComponent extends ɵOsBaseViewComponent {}
