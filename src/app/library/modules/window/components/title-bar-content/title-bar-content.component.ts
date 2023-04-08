import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ɵOsBaseViewComponent } from '../../../../core';

@Component({
    selector: 'os-title-bar-content',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-title-bar-content'
    },
    exportAs: 'osTitleBarContent',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarContentComponent extends ɵOsBaseViewComponent {}
