import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-list-overview',
    templateUrl: './list-overview.component.html',
    styleUrls: ['./list-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListOverviewComponent implements OnInit {

    constructor() { }

    public ngOnInit(): void {}

}
