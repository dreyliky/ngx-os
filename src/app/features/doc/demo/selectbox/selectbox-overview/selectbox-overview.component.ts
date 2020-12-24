import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-selectbox-overview',
    templateUrl: './selectbox-overview.component.html',
    styleUrls: ['./selectbox-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectboxOverviewComponent implements OnInit {

    constructor() {}

    public ngOnInit(): void {}

}
