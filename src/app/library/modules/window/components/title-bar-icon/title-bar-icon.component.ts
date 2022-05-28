import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseComponent } from '../../../../core';

@Component({
    selector: 'os-title-bar-icon',
    template: '',
    host: {
        'class': 'os-title-bar-icon'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarIconComponent extends ɵOsBaseComponent {
    /** The URL to the icon */
    @Input()
    public set url(value: string) {
        if (value) {
            this._iconCssBackground = `url(${value})`;
        }
    }

    @HostBinding('style.backgroundImage')
    public _iconCssBackground: string;
}
