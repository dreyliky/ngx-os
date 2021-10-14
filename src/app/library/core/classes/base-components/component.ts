import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ClasslistManager } from '../css-classlist-manager';
import { StyleListManager } from '../css-stylelist-manager';
import { OsBaseViewComponent } from './view';

@Component({
    template: ''
})
export abstract class OsBaseComponent extends OsBaseViewComponent {
    /** Target internal element stylelist */
    @Input()
    public set style(styleList: object) {
        if (styleList) {
            this.styleListManager.apply(styleList);
        }
    }

    /** Target internal element classList */
    @Input()
    public set styleClass(classList: string | string[] | object) {
        if (classList) {
            this.classListManager.apply(classList);
        }
    }

    /** Target internal element id. By default it generates randomly */
    @Input()
    @HostBinding('attr.id')
    public id: string;

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

    /** Target internal element wheel event */
    @Output()
    public osWheel: EventEmitter<MouseEvent> = new EventEmitter();

    /** Target internal element keydown event */
    @Output()
    public osKeyDown: EventEmitter<KeyboardEvent> = new EventEmitter();

    /** Target internal element keyup event */
    @Output()
    public osKeyUp: EventEmitter<KeyboardEvent> = new EventEmitter();

    /** @internal */
    @HostBinding('class')
    public get _hostClass(): string {
        return this.classListManager.getAsString();
    }

    /** @internal */
    @HostBinding('style')
    public get _hostStyle(): object {
        return this.styleListManager.get();
    }

    protected readonly baseHostClassName = 'os-element';
    protected readonly styleListManager = new StyleListManager();
    protected readonly classListManager = new ClasslistManager();

    constructor() {
        super();
        this.classListManager.add(this.baseHostClassName);
    }

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
