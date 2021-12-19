import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ɵOsBaseViewComponent } from './view';

@Component({
    template: '',
    host: {
        class: 'os-element'
    }
})
export abstract class ɵOsBaseComponent extends ɵOsBaseViewComponent {
    /** Target internal element stylelist */
    @Input()
    @HostBinding('style')
    public style: object;

    /** Target internal element classList */
    @Input()
    @HostBinding('class')
    public styleClass: string | string[] | object;

    /** Target internal element id */
    @Input()
    @HostBinding('attr.id')
    public id: string;

    /** Target internal element click event */
    @Output()
    public readonly osClick: EventEmitter<MouseEvent> = new EventEmitter();

    /** Target internal element dblclick event */
    @Output()
    public readonly osDblClick: EventEmitter<MouseEvent> = new EventEmitter();

    /** Target internal element mousedown event */
    @Output()
    public readonly osMouseDown: EventEmitter<MouseEvent> = new EventEmitter();

    /** Target internal element mousemove event */
    @Output()
    public readonly osMouseMove: EventEmitter<MouseEvent> = new EventEmitter();

    /** Target internal element mouseout event */
    @Output()
    public readonly osMouseOut: EventEmitter<MouseEvent> = new EventEmitter();

    /** Target internal element mouseover event */
    @Output()
    public readonly osMouseOver: EventEmitter<MouseEvent> = new EventEmitter();

    /** Target internal element mouseup event */
    @Output()
    public readonly osMouseUp: EventEmitter<MouseEvent> = new EventEmitter();

    /** Target internal element wheel event */
    @Output()
    public readonly osWheel: EventEmitter<MouseEvent> = new EventEmitter();

    /** Target internal element keydown event */
    @Output()
    public readonly osKeyDown: EventEmitter<KeyboardEvent> = new EventEmitter();

    /** Target internal element keyup event */
    @Output()
    public readonly osKeyUp: EventEmitter<KeyboardEvent> = new EventEmitter();

    /** The handler will be fired on the target internal element in response to an event. */
    protected onClick(event: MouseEvent): void {
        this.osClick.emit(event);
    }

    /** The handler will be fired on the target internal element in response to an event. */
    protected onDblClick(event: MouseEvent): void {
        this.osDblClick.emit(event);
    }

    /** The handler will be fired on the target internal element in response to an event. */
    protected onMouseDown(event: MouseEvent): void {
        this.osMouseDown.emit(event);
    }

    /** The handler will be fired on the target internal element in response to an event. */
    protected onMouseMove(event: MouseEvent): void {
        this.osMouseMove.emit(event);
    }

    /** The handler will be fired on the target internal element in response to an event. */
    protected onMouseOut(event: MouseEvent): void {
        this.osMouseOut.emit(event);
    }

    /** The handler will be fired on the target internal element in response to an event. */
    protected onMouseOver(event: MouseEvent): void {
        this.osMouseOver.emit(event);
    }

    /** The handler will be fired on the target internal element in response to an event. */
    protected onMouseUp(event: MouseEvent): void {
        this.osMouseUp.emit(event);
    }

    /** The handler will be fired on the target internal element in response to an event. */
    protected onWheel(event: WheelEvent): void {
        this.osWheel.emit(event);
    }

    /** The handler will be fired on the target internal element in response to an event. */
    protected onKeyDown(event: KeyboardEvent): void {
        this.osKeyDown.emit(event);
    }

    /** The handler will be fired on the target internal element in response to an event. */
    protected onKeyUp(event: KeyboardEvent): void {
        this.osKeyUp.emit(event);
    }

    /** The method applies observers to the target element.
     * This approach was made to avoid using the HostListener directive
     * because it triggers ChangeDetection every time and we don't need it.
     */
    protected initElementEventObservers(element: HTMLElement): void {
        element.onclick = (event) => this.onClick(event);
        element.ondblclick = (event) => this.onDblClick(event);
        element.onmousedown = (event) => this.onMouseDown(event);
        element.onmouseup = (event) => this.onMouseUp(event);
        element.onmousemove = (event) => this.onMouseMove(event);
        element.onmouseout = (event) => this.onMouseOut(event);
        element.onmouseover = (event) => this.onMouseOver(event);
        element.onwheel = (event) => this.onWheel(event);
        element.onkeydown = (event) => this.onKeyDown(event);
        element.onkeyup = (event) => this.onKeyUp(event);
    }
}
