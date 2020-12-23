import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-scroll-view-overview',
    templateUrl: './scroll-view-overview.component.html',
    styleUrls: ['./scroll-view-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollViewOverviewComponent implements OnInit {

    constructor() {}

    public ngOnInit(): void {}

}
