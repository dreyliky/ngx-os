import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ɵOsBaseComponent } from '../../../../core';

@Component({
    selector: 'os-title-bar-content',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-title-bar-content'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarContentComponent extends ɵOsBaseComponent {}
