import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-window',
    templateUrl: './window.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WindowComponent extends OsBaseComponent {

    @Input()
    public title: string;

    @Input()
    public width: string;

    @Input()
    public height: string;

    @Input()
    public zIndex: number;

    @Input()
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

    constructor() {
        super();
    }

}
