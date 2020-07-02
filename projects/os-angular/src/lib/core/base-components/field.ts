import { Input, Output, EventEmitter, Directive } from '@angular/core';
import { OsBaseComponent } from './element';

@Directive()
export class OsBaseFieldComponent extends OsBaseComponent {

    @Input()
    public disabled: boolean;

    @Input()
    public placeholder: string;

    @Input()
    public label: string;

    @Input()
    public name: string;

    @Output()
    public OnFocus: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public OnBlur: EventEmitter<Event> = new EventEmitter();

    @Output()
    public OnChange: EventEmitter<Event> = new EventEmitter();

    constructor () {
        super({
            elementName: 'os-field'
        });
    }

}
