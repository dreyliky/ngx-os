import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'demo-button-overview',
    templateUrl: './button-overview.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonOverviewComponent implements OnInit {

    constructor() {}

    public ngOnInit(): void {}

}
