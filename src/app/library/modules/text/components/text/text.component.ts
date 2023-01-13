import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ɵOsBaseViewComponent } from '../../../../core';

@Component({
    selector: 'os-text',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-text'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent extends ɵOsBaseViewComponent {}
