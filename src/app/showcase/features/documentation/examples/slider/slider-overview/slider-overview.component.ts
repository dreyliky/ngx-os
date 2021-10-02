import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-slider-overview',
    templateUrl: './slider-overview.component.html',
    styleUrls: ['./slider-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderOverviewComponent {}
