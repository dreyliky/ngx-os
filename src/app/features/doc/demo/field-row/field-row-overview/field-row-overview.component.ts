import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-field-row-overview',
    templateUrl: './field-row-overview.component.html',
    styleUrls: ['./field-row-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldRowOverviewComponent implements OnInit {

    constructor() {}

    public ngOnInit(): void {}

}
