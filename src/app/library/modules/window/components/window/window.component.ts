import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnInit
} from '@angular/core';
import { CommonCssClassEnum, OsBaseComponent } from '../../../../core';

/**
 * ## Content Projection Slots
 * - Attribute `os-title-bar`: Slot for title-bar. You can pass {@link TitleBarComponent}
 * or use your custom element instead of default title-bar
 * - `Others`: Will be placed inside the body of the window
 **/
@Component({
    selector: 'os-window',
    templateUrl: './window.component.html',
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
        this.classListManager.add('os-window');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }
}
