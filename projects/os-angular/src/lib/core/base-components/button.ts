import { Input, Output, EventEmitter, Component } from '@angular/core';
import { OsBaseComponent } from './element';

@Component({
    template: ''
})
export class OsBaseButtonComponent extends OsBaseComponent {

    @Input()
    public disabled: boolean;

    @Input()
    public ariaLabel: string;

    @Input()
    public ariaControls: string;

    @Input()
    public ariaSelected: string;

    @Input()
    public role: string;

    @Output()
    public osFocus: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public osBlur: EventEmitter<MouseEvent> = new EventEmitter();

    constructor () {
        super();
    }

}
