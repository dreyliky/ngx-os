import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { CommonCssClassEnum, OsBaseComponent } from '../../../../core';

/**
 * ## Content Projection Slots
 *
 * - Component `os-title-bar`: Slot for title-bar. You should pass {@link TitleBarComponent}
 * or use your custom element instead of default title-bar
 * - `Others`: Will be placed inside the body of the window
 *
 * @example
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
export class WindowComponent extends OsBaseComponent implements OnInit {
    /** The width of the window as CSS string */
    @Input()
    @HostBinding('style.width')
    public width: string;

    /** The height of the window as CSS string */
    @Input()
    @HostBinding('style.height')
    public height: string;

    /** The zIndex of the window as CSS value */
    @Input()
    @HostBinding('style.zIndex')
    public zIndex: number;

    /** Marks window as active (means user works with it right now) */
    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Active}`)
    public isActive: boolean = false;

    /** Stylelist for scroll view component of the window */
    @Input()
    public scrollViewStyle: object;

    /** Classlist for scroll view component of the window */
    @Input()
    public scrollViewStyleClass: string | string[] | object;

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }
}
