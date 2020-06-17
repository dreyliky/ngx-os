import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'os-field-row',
    templateUrl: './field-row.component.html',
    styleUrls: ['./field-row.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldRowComponent implements OnInit {

    @Input()
    public stacked: boolean = false;

    constructor () {}

    public ngOnInit (): void {}

}
