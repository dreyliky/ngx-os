import {
    ChangeDetectionStrategy,
    Component,
    HostBinding, ViewEncapsulation
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
    /** @internal */
    @HostBinding(`class.${ɵCommonCssClassEnum.Active}`)
    public _isActive = false;

    /** @internal */
    public _setIsActive(state: boolean): void {
        this._isActive = state;

        this.changeDetector.markForCheck();
    }
}
