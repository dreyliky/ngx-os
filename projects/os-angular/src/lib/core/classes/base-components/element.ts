import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
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
    protected onClick(event: PointerEvent): void {
        this.osClick.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    protected onDblClick(event: MouseEvent): void {
        this.osDblClick.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    protected onMouseDown(event: MouseEvent): void {
        this.osMouseDown.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    protected onMouseMove(event: MouseEvent): void {
        this.osMouseMove.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    protected onMouseOut(event: MouseEvent): void {
        this.osMouseOut.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    protected onMouseOver(event: MouseEvent): void {
        this.osMouseOver.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    protected onMouseUp(event: MouseEvent): void {
        this.osMouseUp.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    protected onWheel(event: WheelEvent): void {
        this.osWheel.emit(event);
    }

    protected initElementEventObservers(element: HTMLElement): void {
        element.onclick = (event: PointerEvent) => this.onClick(event);
        element.ondblclick = (event: MouseEvent) => this.onDblClick(event);
        element.onmousedown = (event: MouseEvent) => this.onMouseDown(event);
        element.onmouseup = (event: MouseEvent) => this.onMouseUp(event);
        element.onmousemove = (event: MouseEvent) => this.onMouseMove(event);
        element.onmouseout = (event: MouseEvent) => this.onMouseOut(event);
        element.onmouseover = (event: MouseEvent) => this.onMouseOver(event);
        element.onwheel = (event: WheelEvent) => this.onWheel(event);
    }
}
