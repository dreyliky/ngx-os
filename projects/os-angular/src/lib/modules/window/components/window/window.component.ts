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
    public scrollViewStyle: any;

    @Input()
    public scrollViewStyleClass: any;

    @Output()
    public osClick = new EventEmitter<MouseEvent>();

    @Output()
    public osMouseDown = new EventEmitter<MouseEvent>();

    @Output()
    public osMouseUp = new EventEmitter<MouseEvent>();

    @Output()
    public osTitleBarClick = new EventEmitter<MouseEvent>();

    @Output()
    public osTitleBarDblClick = new EventEmitter<MouseEvent>();

    @Output()
    public osMinimizeButtonClick = new EventEmitter<MouseEvent>();

    @Output()
    public osMaximizeButtonClick = new EventEmitter<MouseEvent>();

    @Output()
    public osCloseButtonClick = new EventEmitter<MouseEvent>();

    public ngOnInit(): void {
        this.hostClasslistManager.add('os-window');
    }
}
