import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { ɵCommonCssClassEnum, ɵOsBaseButtonComponent } from '../../../../core';

@Component({
    selector: 'os-menu-bar-button',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-menu-bar-button'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuBarButtonComponent extends ɵOsBaseButtonComponent {
    @Input()
    @HostBinding(`class.${ɵCommonCssClassEnum.Active}`)
    public isActive = false;

    /** @internal */
    public _setIsActive(state: boolean): void {
        this.isActive = state;

        this.changeDetector.markForCheck();
    }
}
