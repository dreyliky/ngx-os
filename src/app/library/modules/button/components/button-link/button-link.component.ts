import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ɵOsBaseViewComponent } from '../../../../core';

@Component({
    selector: 'button[os-button-link]',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-button-link'
    },
    exportAs: 'osButtonLink',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonLinkComponent extends ɵOsBaseViewComponent {}
