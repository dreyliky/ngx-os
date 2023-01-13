import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-input-number-overview',
    templateUrl: './input-number-overview.component.html',
    styleUrls: ['./input-number-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputNumberOverviewComponent {}
