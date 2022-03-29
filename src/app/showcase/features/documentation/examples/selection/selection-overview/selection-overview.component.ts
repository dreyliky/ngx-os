import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-selection-overview',
    templateUrl: './selection-overview.component.html',
    styleUrls: ['./selection-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionOverviewComponent {}
