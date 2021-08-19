import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OsBaseComponent } from './element';

@Component({
    template: ''
})
export class OsBaseButtonComponent extends OsBaseComponent {
    @Input()
    public isDisabled: boolean;

    @Input()
    public ariaLabel: string;

    @Input()
    public ariaControls: string;

    @Input()
    public ariaSelected: string;

    @Input()
    public role: string;

    /**
     * Target internal element focus event
     */
    @Output()
    public osFocus: EventEmitter<MouseEvent> = new EventEmitter();

    /**
     * Target internal element blur event
     */
    @Output()
    public osBlur: EventEmitter<MouseEvent> = new EventEmitter();

    constructor() {
        super();
    }
}
