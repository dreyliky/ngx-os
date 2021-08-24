import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OsBaseComponent } from './element';

@Component({
    template: ''
})
export class OsBaseFieldComponent extends OsBaseComponent {
    @Input()
    public isDisabled: boolean;

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
    public osFocus: EventEmitter<MouseEvent> = new EventEmitter();

    /** The handler will be fired on the host element in response to an event. */
    @Output()
    public osBlur: EventEmitter<Event> = new EventEmitter();
}
