import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseViewComponent } from '../../../../core';

@Component({
    selector: 'os-title-bar-icon',
    template: '',
    host: {
        'class': 'os-title-bar-icon'
    },
    exportAs: 'osTitleBarIcon',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarIconComponent extends ɵOsBaseViewComponent {
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
