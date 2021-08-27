import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { OsBaseComponent } from '@lib-core';

@Component({
    selector: 'os-window',
    templateUrl: './window.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WindowComponent extends OsBaseComponent implements OnInit {
    @Input()
    public title: string;

    @Input()
    @HostBinding('style.width')
    public width: string;

    @Input()
    @HostBinding('style.height')
    public height: string;

    @Input()
    @HostBinding('style.zIndex')
    public zIndex: number;

    @Input()
    public iconUrl: string;

    @Input()
    @HostBinding('class.active')
    public isActive: boolean = false;

    @Input()
    public isMinimizable: boolean = true;

    @Input()
    public isMaximizable: boolean = true;

    @Input()
    public isClosable: boolean = true;

    @Input()
    public isTitleBarVisible: boolean = true;

    @Input()
    public scrollViewStyle: object;

    @Input()
    public scrollViewStyleClass: string | string[] | object;

    @Output()
    public osTitleBarClick: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public osTitleBarDblClick: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public osMinimizeButtonClick: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public osMaximizeButtonClick: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public osCloseButtonClick: EventEmitter<MouseEvent> = new EventEmitter();

    public get titleBarDisplayAttr(): string {
        return (this.isTitleBarVisible) ? '' : 'none';
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-window');
    }
}
