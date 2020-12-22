import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { OsBaseFieldComponent } from 'os-angular/core';

@Component({
    selector: 'os-textarea-box',
    templateUrl: './textarea-box.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaBoxComponent extends OsBaseFieldComponent {

    @Input()
    public rows: number;

    @Input()
    public cols: number;

    constructor() {
        super();
    }

}
