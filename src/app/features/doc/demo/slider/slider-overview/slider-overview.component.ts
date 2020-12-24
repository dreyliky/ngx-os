import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-slider-overview',
    templateUrl: './slider-overview.component.html',
    styleUrls: ['./slider-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderOverviewComponent implements OnInit {

    constructor() {}

    public ngOnInit(): void {}

}
