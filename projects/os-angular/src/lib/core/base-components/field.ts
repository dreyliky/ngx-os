import { Input, Output, EventEmitter } from '@angular/core';
import { OsBaseComponent } from './element';

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
    public OnBlur: EventEmitter<MouseEvent> = new EventEmitter();

    constructor () {
        super({
            elementName: 'os-field'
        });
    }

}
