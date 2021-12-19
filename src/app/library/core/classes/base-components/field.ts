import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ɵCommonCssClassEnum } from '../../enums';
import { ɵOsBaseFormControlComponent } from './form-control-element';

@Component({
    template: ''
})
export abstract class ɵOsBaseFieldComponent extends ɵOsBaseFormControlComponent {
    /** Is field disabled? */
    @Input()
    @HostBinding(`class.${ɵCommonCssClassEnum.Disabled}`)
    public isDisabled: boolean = false;

    /** Is field readonly? */
    @Input()
    @HostBinding(`class.${ɵCommonCssClassEnum.Readonly}`)
    public isReadonly: boolean = false;

    /** Is field autofocused? */
    @Input()
    public isAutofocused: boolean = false;

    /** Placeholder text of the field */
    @Input()
    public placeholder: string = '';

    /** Name of the field group */
    @Input()
    public name: string;

    /** Native `input` size property */
    @Input()
    public size: number;

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

    /** Value of the field as text */
    public value: string = '';

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

    protected abstract onFieldValueChange(event: Event): void;
}
