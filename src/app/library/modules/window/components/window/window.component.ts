import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { ɵCommonCssClassEnum, ɵOsBaseViewComponent } from '../../../../core';

/**
 * ## Content Projection Slots
 *
 * - Component `os-title-bar`: Slot for title-bar. You should pass {@link TitleBarComponent}
 * or use your custom element instead of default title-bar
 * - `Others`: Will be placed inside the body of the window
 *
 * ```html
 * <os-window>
 *     <os-title-bar>MY CUSTOM TITLE BAR CONTENT HERE</os-title-bar>
 *     <div>ANY CONTENT OF THE WINDOW HERE</div>
 * </os-window>
 * ```
 **/
@Component({
    selector: 'os-window',
    templateUrl: './window.component.html',
    host: {
        'class': 'os-window'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WindowComponent extends ɵOsBaseViewComponent {
    /** Marks window as active (means user works with it right now) */
    @Input()
    @HostBinding(`class.${ɵCommonCssClassEnum.Active}`)
    public isActive: boolean = true;

    /** Stylelist for scroll view component of the window */
    @Input()
    public scrollViewStyle: object;

    /** Classlist for scroll view component of the window */
    @Input()
    public scrollViewStyleClass: string | string[] | object;
}
