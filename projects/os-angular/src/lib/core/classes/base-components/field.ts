import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { IdGenerator } from '@lib-helpers';
import { ClasslistManager } from '../css-classlist-manager';

@Component({
    template: ''
})
export class OsBaseFieldComponent {
    @Input()
    public isDisabled: boolean = false;

    @Input()
    public isReadonly: boolean = false;

    @Input()
    public isAutocompleteEnabled: boolean = false;

    @Input()
    public placeholder: string = '';

    @Input()
    public label: string;

    @Input()
    public name: string;

    @Input()
    public size: number = 20;

    @Input()
    public value: string = '';

    /** Object with css styles which will applied for target internal element */
    @Input()
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

    /** The handler will be fired on the host element in response to an event. */
    @Output()
    public osFocus: EventEmitter<FocusEvent> = new EventEmitter();

    /** The handler will be fired on the host element in response to an event. */
    @Output()
    public osBlur: EventEmitter<FocusEvent> = new EventEmitter();

    public get fieldAutocompleteAttrValue(): string {
        return (this.isAutocompleteEnabled) ? '' : 'off';
    }

    protected readonly classlistManager: ClasslistManager;

    constructor() {
        this.classlistManager = new ClasslistManager();
    }

    @HostListener('focus', ['$event'])
    protected onFocus(event: FocusEvent): void {
        this.osFocus.emit(event);
    }

    @HostListener('blur', ['$event'])
    protected onBlur(event: FocusEvent): void {
        this.osBlur.emit(event);
    }
}
