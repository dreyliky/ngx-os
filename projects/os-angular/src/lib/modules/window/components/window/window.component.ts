import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-window',
    templateUrl: './window.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WindowComponent extends OsBaseComponent implements OnInit {

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
    public isFullscreen: boolean = false;

    @Input()
    public isHidden: boolean = false;

    @Input()
    public isMinimizable: boolean = true;

    @Input()
    public isMaximizable: boolean = true;

    @Input()
    public isClosable: boolean = true;

    @Input()
    public scrollViewStyle: any;

    @Input()
    public scrollViewStyleClass: any;

    @Output()
    public OnClick = new EventEmitter<MouseEvent>();

    @Output()
    public OnMouseDown = new EventEmitter<MouseEvent>();

    @Output()
    public OnMouseUp = new EventEmitter<MouseEvent>();

    @Output()
    public OnTitleBarClick = new EventEmitter<MouseEvent>();

    @Output()
    public OnTitleBarDblClick = new EventEmitter<MouseEvent>();

    @Output()
    public OnMinimizeButtonClick = new EventEmitter<MouseEvent>();

    @Output()
    public OnMaximizeButtonClick = new EventEmitter<MouseEvent>();

    @Output()
    public OnCloseButtonClick = new EventEmitter<MouseEvent>();

    constructor () {
        super({
            elementName: 'os-window'
        });
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

}