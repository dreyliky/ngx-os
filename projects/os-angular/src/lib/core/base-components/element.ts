import { Input, Output, EventEmitter, Component } from '@angular/core';

@Component({
    template: ''
})
export class OsBaseComponent {

    @Input()
    public style: any;

    @Input()
    public styleClass: string;

    @Output()
    public osClick: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public osDblclick: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public osMousedown: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public osMousemove: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public osMouseout: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public osMouseover: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public osMouseup: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public osWheel: EventEmitter<MouseEvent> = new EventEmitter();

    constructor () {}

}
