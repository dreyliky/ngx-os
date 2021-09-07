import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OsBaseComponent } from './element';

@Component({
    template: ''
})
export abstract class OsBaseFieldComponent extends OsBaseComponent {
    @Input()
    public isDisabled: boolean = false;

    @Input()
    public isReadonly: boolean = false;

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

    /** The handler will be fired on the host element in response to an event. */
    @Output()
    public osFocus: EventEmitter<FocusEvent> = new EventEmitter();

    /** The handler will be fired on the host element in response to an event. */
    @Output()
    public osBlur: EventEmitter<FocusEvent> = new EventEmitter();

    /** The handler will be fired on the host element in response to an event. */
    protected onFocus(event: FocusEvent): void {
        this.osFocus.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    protected onBlur(event: FocusEvent): void {
        this.osBlur.emit(event);
    }

    protected initElementEventObservers(element: HTMLElement): void {
        element.onfocus = (event: MouseEvent) => this.onFocus(event);
        element.onblur = (event: MouseEvent) => this.onBlur(event);

        super.initElementEventObservers(element);
    }
}
