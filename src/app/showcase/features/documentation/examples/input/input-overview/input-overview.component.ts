import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-input-overview',
    templateUrl: './input-overview.component.html',
    styleUrls: ['./input-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputOverviewComponent {}
