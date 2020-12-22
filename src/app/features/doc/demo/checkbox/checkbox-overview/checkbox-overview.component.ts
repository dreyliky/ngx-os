import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-checkbox-overview',
    templateUrl: './checkbox-overview.component.html',
    styleUrls: ['./checkbox-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxOverviewComponent implements OnInit {

    constructor() {}

    public ngOnInit(): void {}

}
