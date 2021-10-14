import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CommonCssClassEnum } from '../../enums';
import { OsBaseFormControlComponent } from './form-control-element';

@Component({
    template: ''
})
export abstract class OsBaseFieldComponent extends OsBaseFormControlComponent {
    /** Is field disabled? */
    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Disabled}`)
    public readonly isDisabled: boolean = false;

    /** Is field readonly? */
    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Readonly}`)
    public readonly isReadonly: boolean = false;

    /** Is field autofocused? */
    @Input()
    public readonly isAutofocused: boolean = false;

    /** Placeholder text of the field */
    @Input()
    public readonly placeholder: string = '';

    /** Name of the field group */
    @Input()
    public readonly name: string;

    /** Native `input` size property */
    @Input()
    public readonly size: number = 20;

    /** Value of the field as text */
    @Input()
    public value: string = '';

    /** The handler will be fired when the value changes. */
    @Output()
    public readonly valueChange: EventEmitter<string> = new EventEmitter();

    /** The handler will be fired on the internal element in response to an event. */
    @Output()
    public readonly osFocus: EventEmitter<FocusEvent> = new EventEmitter();

    /** The handler will be fired on the internal element in response to an event. */
    @Output()
    public readonly osBlur: EventEmitter<FocusEvent> = new EventEmitter();

    /** The handler will be fired on the internal element in response to an event. */
    @Output()
    public readonly osInput: EventEmitter<Event> = new EventEmitter();

    /** @internal */
    public abstract osChange: EventEmitter<any>;

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

    protected onFieldValueChange(event: Event): void {
        this.valueChange.emit((event.target as HTMLInputElement).value);
    }

    protected initElementEventObservers(element: HTMLElement): void {
        element.onfocus = (event) => this.onFocus(event);
        element.onblur = (event) => this.onBlur(event);
        element.oninput = (event) => this.onInput(event);
        element.onchange = (event) => this.onFieldValueChange(event);

        super.initElementEventObservers(element);
    }

    protected autoFocusFieldIfNeeded(field: HTMLInputElement): void {
        if (this.isAutofocused) {
            field.focus();
        }
    }
}
