import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnInit
} from '@angular/core';
import { OsBaseComponent } from '@lib-core';

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
    @HostBinding('class.os-active')
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
