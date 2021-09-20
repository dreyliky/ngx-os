import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { OsBaseComponent } from '@lib-core';

@Component({
    selector: 'os-window',
    templateUrl: './window.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WindowComponent extends OsBaseComponent implements OnInit {
    /** The title text of the window's title bar */
    @Input()
    public title: string;

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

    /** The link to the icon. Will be displayed in the window's title bar */
    @Input()
    public iconUrl: string;

    /** Marks window as active (means user works with it right now) */
    @Input()
    @HostBinding('class.os-active')
    public isActive: boolean = false;

    /** Can the window be hidden */
    @Input()
    public isMinimizable: boolean = true;

    /** Can the window be at full-screen */
    @Input()
    public isMaximizable: boolean = true;

    /** Can the window be closed */
    @Input()
    public isClosable: boolean = true;

    /** Is the need to display the title bar */
    @Input()
    public isTitleBarVisible: boolean = true;

    /** Styles for scroll view component of the window */
    @Input()
    public scrollViewStyle: object;

    /** Classes for scroll view component of the window */
    @Input()
    public scrollViewStyleClass: string | string[] | object;

    /** Fires when the title bar click */
    @Output()
    public osTitleBarClick: EventEmitter<MouseEvent> = new EventEmitter();

    /** Fires when the title bar double click */
    @Output()
    public osTitleBarDblClick: EventEmitter<MouseEvent> = new EventEmitter();

    /** Fires when the "hide window" button in the title bar click */
    @Output()
    public osMinimizeButtonClick: EventEmitter<MouseEvent> = new EventEmitter();

    /** Fires when the "toggle full-screen for window" button in the title bar click */
    @Output()
    public osMaximizeButtonClick: EventEmitter<MouseEvent> = new EventEmitter();

    /** Fires when the "close window" button in the title bar click */
    @Output()
    public osCloseButtonClick: EventEmitter<MouseEvent> = new EventEmitter();

    public get _titleBarIconCssBackground(): string {
        return `url(${this.iconUrl})`;
    }

    public get _titleBarDisplayAttr(): string {
        return (this.isTitleBarVisible) ? '' : 'none';
    }

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-window');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }
}
