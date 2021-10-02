import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-slider-overview',
    templateUrl: './slider-overview.component.html',
    styleUrls: ['./slider-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderOverviewComponent {}
