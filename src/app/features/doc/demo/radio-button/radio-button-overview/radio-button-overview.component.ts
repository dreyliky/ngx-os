import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-radio-button-overview',
    templateUrl: './radio-button-overview.component.html',
    styleUrls: ['./radio-button-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonOverviewComponent implements OnInit {

    constructor() {}

    public ngOnInit(): void {}

}
