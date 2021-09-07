import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OsBaseFormControlComponent } from './form-control-element';

@Component({
    template: ''
})
export abstract class OsBaseFieldComponent extends OsBaseFormControlComponent {
    @Input()
    public isDisabled: boolean = false;

    @Input()
    public isReadonly: boolean = false;

    @Input()
    public placeholder: string = '';

    @Input()
    public name: string;

    @Input()
    public size: number = 20;

    @Input()
    public value: string = '';

    /** The handler will be fired on the internal element in response to an event. */
    @Output()
    public osFocus: EventEmitter<FocusEvent> = new EventEmitter();

    /** The handler will be fired on the internal element in response to an event. */
    @Output()
    public osBlur: EventEmitter<FocusEvent> = new EventEmitter();

    /** The handler will be fired on the internal element in response to an event. */
    @Output()
    public osInput: EventEmitter<Event> = new EventEmitter();

    public abstract osChange: EventEmitter<any>;

    public writeValue(value: string): void {
        // FIXME: Probably needs change detection
        this.value = value;
    }

    /** The handler will be fired on the internal element in response to an event. */
    protected onFocus(event: FocusEvent): void {
        this.osFocus.emit(event);
    }

    /** The handler will be fired on the internal element in response to an event. */
    protected onBlur(event: FocusEvent): void {
        this.osBlur.emit(event);
    }

    /** The handler will be fired on the internal element in response to an event. */
    protected onInput(event: Event): void {
        this.osInput.emit(event);
    }

    protected initElementEventObservers(element: HTMLElement): void {
        element.onfocus = (event) => this.onFocus(event);
        element.onblur = (event) => this.onBlur(event);
        element.oninput = (event) => this.onInput(event);
        element.onchange = (event) => this.onFieldValueChange(event);

        super.initElementEventObservers(element);
    }

    protected abstract onFieldValueChange(event: Event): void;
}
