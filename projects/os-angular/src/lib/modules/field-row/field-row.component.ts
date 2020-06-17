import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'os-field-row',
    templateUrl: './field-row.component.html',
    styleUrls: ['./field-row.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldRowComponent implements OnInit {

    constructor () {}

    public ngOnInit (): void {}

}
