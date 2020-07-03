import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-field-row',
    templateUrl: './field-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldRowComponent extends OsBaseComponent implements OnInit {

    @Input()
    public stacked: boolean = false;

    constructor () {
        super({
            elementName: 'os-field-row'
        });
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

}
