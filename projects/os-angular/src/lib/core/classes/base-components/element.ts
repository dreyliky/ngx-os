import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { IdGenerator } from '@lib-helpers';
import { HostClasslistManager } from '../css-classlist-manager';

@Component({
    template: ''
})
export abstract class OsBaseComponent {
    /**
     * Object with css styles which will applied for target internal element
     */
    @Input()
    @HostBinding('style')
    public style: object;

    /**
     * String, Array of strings or object with classlist
     */
    @Input()
    public set styleClass(classlist: string | string[] | object) {
        if (classlist) {
            this.hostClasslistManager.apply(classlist);
        }
    }

    /**
     * Id of html element. By default it generates randomly
     */
    @Input()
    @HostBinding('id')
    public id: string = IdGenerator.generate('os-element');

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
     * Target internal element wheel event>
     */
    @Output()
    public osWheel: EventEmitter<MouseEvent> = new EventEmitter();

    @HostBinding('class')
    public get hostClass(): string {
        return this.hostClasslistManager.getAsString();
    }

    protected readonly baseHostClassName = 'os-element';
    protected readonly hostClasslistManager = new HostClasslistManager();

    constructor() {
        this.hostClasslistManager.add(this.baseHostClassName);
    }

    /** The handler will be fired on the host element in response to an event. */
    @HostListener('click', ['$event'])
    protected onClick(event: PointerEvent): void {
        this.osClick.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    @HostListener('dblclick', ['$event'])
    protected onDblClick(event: MouseEvent): void {
        this.osDblclick.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    @HostListener('mousedown', ['$event'])
    protected onMousedown(event: MouseEvent): void {
        this.osMousedown.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    @HostListener('mousemove', ['$event'])
    protected onMousemove(event: MouseEvent): void {
        this.osMousemove.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    @HostListener('mouseout', ['$event'])
    protected onMouseout(event: MouseEvent): void {
        this.osMouseout.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    @HostListener('mouseover', ['$event'])
    protected onMouseover(event: MouseEvent): void {
        this.osMouseover.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    @HostListener('mouseup', ['$event'])
    protected onMouseup(event: MouseEvent): void {
        this.osMouseup.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    @HostListener('wheel', ['$event'])
    protected onWheel(event: WheelEvent): void {
        this.osWheel.emit(event);
    }
}
