import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'os-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {

    @Input()
    public type: string;

    @Input()
    public disabled: boolean;

    @Input()
    public style: any;

    @Input()
    public styleClass: string;

    @Output()
    public OnClick: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public OnFocus: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public OnBlur: EventEmitter<MouseEvent> = new EventEmitter();

    constructor () {}

    public ngOnInit (): void {}

}
