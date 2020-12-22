import { Input, Output, EventEmitter, Component } from '@angular/core';
import { OsBaseComponent } from './element';

@Component({
    template: ''
})
export class OsBaseFieldComponent extends OsBaseComponent {

    @Input()
    public disabled: boolean;

    @Input()
    public placeholder: string = '';

    @Input()
    public label: string;

    @Input()
    public name: string;

    @Output()
    public osFocus: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public osBlur: EventEmitter<Event> = new EventEmitter();

    @Output()
    public osChange: EventEmitter<Event> = new EventEmitter();

    constructor () {
        super();
    }

}
