import { Input, Output, EventEmitter, Component } from '@angular/core';

@Component({
    template: ''
})
export class OsBaseComponent {

    /**
     * Object with css styles which will applied for target internal element
     */
    @Input()
    public style: object;

    /**
     * String with classes for target internal element
     */
    @Input()
    public styleClass: string;

    /**
     * Target internal element click event
     */
    @Output()
    public osClick: EventEmitter<MouseEvent> = new EventEmitter();

    /**
     * Target internal element dblclick event
     */
    @Output()
    public osDblclick: EventEmitter<MouseEvent> = new EventEmitter();

    /**
     * Target internal element mousedown event
     */
    @Output()
    public osMousedown: EventEmitter<MouseEvent> = new EventEmitter();

    /**
     * Target internal element mousemove event
     */
    @Output()
    public osMousemove: EventEmitter<MouseEvent> = new EventEmitter();

    /**
     * Target internal element mouseout event
     */
    @Output()
    public osMouseout: EventEmitter<MouseEvent> = new EventEmitter();

    /**
     * Target internal element mouseover event
     */
    @Output()
    public osMouseover: EventEmitter<MouseEvent> = new EventEmitter();

    /**
     * Target internal element mouseup event
     */
    @Output()
    public osMouseup: EventEmitter<MouseEvent> = new EventEmitter();

    /**
     * Target internal element wheel event
     */
    @Output()
    public osWheel: EventEmitter<MouseEvent> = new EventEmitter();

    constructor () {}

}
