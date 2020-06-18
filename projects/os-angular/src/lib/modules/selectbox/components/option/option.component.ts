import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, TemplateRef } from '@angular/core';
import { OsBaseComponent } from 'projects/os-angular/src/lib/core';

@Component({
    selector: 'os-option',
    templateUrl: './option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionComponent extends OsBaseComponent implements OnInit {

    @Input()
    public selected: boolean;

    @ViewChild('OptionTemplate', { static: true })
    public optionTemplate: TemplateRef<HTMLOptionElement>;

    constructor () {
        super({
            elementName: 'os-option'
        });
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

}
