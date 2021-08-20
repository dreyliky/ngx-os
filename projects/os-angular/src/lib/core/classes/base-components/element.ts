import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { IdGenerator } from '@lib-helpers';

class HostClasslistManager {
    private readonly data: string[] = [];

    public getAsString(): string {
        return this.data.join(' ');
    }

    public getAsArray(): string[] {
        return [...this.data];
    }

    public add(className: string): void {
        this.validateClassName(className);

        this.splitClassNameToArray(className)
            .filter((targetClassName) => !this.has(targetClassName))
            .forEach((targetClassName) => this.data.push(targetClassName));
    }

    public applyAsFlag(className: string, active: boolean): void {
        if (active) {
            this.add(className);
        } else {
            this.remove(className);
        }
    }

    public remove(className: string): void {
        const classNameIndex = this.data.indexOf(className);

        if (classNameIndex !== -1) {
            this.data.splice(classNameIndex, 1);
        }
    }

    public has(className: string): boolean {
        return this.data.includes(className);
    }

    private splitClassNameToArray(className: string): string[] {
        return className.split(' ');
    }

    private validateClassName(className: string): void {
        if (!className) {
            throw new Error('HostClasslistManager recieve incorrect className');
        }
    }
}

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
     * String with classes for target internal element
     */
    @Input()
    public set styleClass(className: string) {
        this.hostClasslistManager.add(className);
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

    @HostListener('click', ['$event'])
    protected onClick(event: PointerEvent): void {
        this.osClick.emit(event);
    }

    @HostListener('dblclick', ['$event'])
    protected onDblClick(event: MouseEvent): void {
        this.osDblclick.emit(event);
    }

    @HostListener('mousedown', ['$event'])
    protected onMousedown(event: MouseEvent): void {
        this.osMousedown.emit(event);
    }

    @HostListener('mousemove', ['$event'])
    protected onMousemove(event: MouseEvent): void {
        this.osMousemove.emit(event);
    }

    @HostListener('mouseout', ['$event'])
    protected onMouseout(event: MouseEvent): void {
        this.osMouseout.emit(event);
    }

    @HostListener('mouseover', ['$event'])
    protected onMouseover(event: MouseEvent): void {
        this.osMouseover.emit(event);
    }

    @HostListener('mouseup', ['$event'])
    protected onMouseup(event: MouseEvent): void {
        this.osMouseup.emit(event);
    }

    @HostListener('wheel', ['$event'])
    protected onWheel(event: WheelEvent): void {
        this.osWheel.emit(event);
    }
}
