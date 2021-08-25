import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { IdGenerator } from '@lib-helpers';
import { ClasslistManager } from '../css-classlist-manager';

@Component({
    template: ''
})
export abstract class OsBaseComponent {
    /** Object with css styles which will applied for target internal element */
    @Input()
    @HostBinding('style')
    public style: object;

    /** String, Array of strings or object with classlist */
    @Input()
    public set styleClass(classlist: string | string[] | object) {
        if (classlist) {
            this.classlistManager.apply(classlist);
        }
    }

    /** Id of html element. By default it generates randomly */
    @Input()
    @HostBinding('id')
    public id: string = IdGenerator.generate('os-element');

    /** Target internal element click event */
    @Output()
    public osClick: EventEmitter<MouseEvent> = new EventEmitter();

    /** Target internal element dblclick event */
    @Output()
    public osDblClick: EventEmitter<MouseEvent> = new EventEmitter();

    /** Target internal element mousedown event */
    @Output()
    public osMouseDown: EventEmitter<MouseEvent> = new EventEmitter();

    /** Target internal element mousemove event */
    @Output()
    public osMouseMove: EventEmitter<MouseEvent> = new EventEmitter();

    /** Target internal element mouseout event */
    @Output()
    public osMouseOut: EventEmitter<MouseEvent> = new EventEmitter();

    /** Target internal element mouseover event */
    @Output()
    public osMouseOver: EventEmitter<MouseEvent> = new EventEmitter();

    /** Target internal element mouseup event */
    @Output()
    public osMouseUp: EventEmitter<MouseEvent> = new EventEmitter();

    /** Target internal element wheel event> */
    @Output()
    public osWheel: EventEmitter<MouseEvent> = new EventEmitter();

    @HostBinding('class')
    public get hostClass(): string {
        return this.classlistManager.getAsString();
    }

    protected readonly baseHostClassName = 'os-element';
    protected readonly classlistManager = new ClasslistManager();

    constructor() {
        this.classlistManager.add(this.baseHostClassName);
    }

    /** The handler will be fired on the host element in response to an event. */
    @HostListener('click', ['$event'])
    protected onClick(event: PointerEvent): void {
        this.osClick.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    @HostListener('dblclick', ['$event'])
    protected onDblClick(event: MouseEvent): void {
        this.osDblClick.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    @HostListener('mousedown', ['$event'])
    protected onMouseDown(event: MouseEvent): void {
        this.osMouseDown.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    @HostListener('mousemove', ['$event'])
    protected onMouseMove(event: MouseEvent): void {
        this.osMouseMove.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    @HostListener('mouseout', ['$event'])
    protected onMouseOut(event: MouseEvent): void {
        this.osMouseOut.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    @HostListener('mouseover', ['$event'])
    protected onMouseOver(event: MouseEvent): void {
        this.osMouseOver.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    @HostListener('mouseup', ['$event'])
    protected onMouseUp(event: MouseEvent): void {
        this.osMouseUp.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    @HostListener('wheel', ['$event'])
    protected onWheel(event: WheelEvent): void {
        this.osWheel.emit(event);
    }
}
