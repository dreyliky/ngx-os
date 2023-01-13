import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { ɵCommonCssClassEnum, ɵOsBaseViewComponent } from '../../../../core';

@Component({
    selector: 'os-title-bar',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-title-bar'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarComponent extends ɵOsBaseViewComponent {
    /** Marks title bar as active (means user works with it right now) */
    @Input()
    @HostBinding(`class.${ɵCommonCssClassEnum.Active}`)
    public isActive: boolean = true;
}
