import { Component, ChangeDetectionStrategy, Input, ViewChild, TemplateRef } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-option',
    templateUrl: './option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionComponent extends OsBaseComponent {

    @Input()
    public selected: boolean;

    @ViewChild('OptionTemplate', { static: true })
    public optionTemplate: TemplateRef<HTMLOptionElement>;

    constructor () {
        super();
    }

}
