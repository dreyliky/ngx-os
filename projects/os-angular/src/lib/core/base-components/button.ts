import { Input, Output, EventEmitter } from '@angular/core';
import { OsBaseComponent } from './element';

export class OsBaseButtonComponent extends OsBaseComponent {

    @Input()
    public disabled: boolean;

    @Output()
    public OnFocus: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public OnBlur: EventEmitter<MouseEvent> = new EventEmitter();

    constructor () {
        super({
            elementName: 'os-button'
        });
    }

}
