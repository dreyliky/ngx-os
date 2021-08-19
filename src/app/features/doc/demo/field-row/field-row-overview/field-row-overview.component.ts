import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-field-row-overview',
    templateUrl: './field-row-overview.component.html',
    styleUrls: ['./field-row-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldRowOverviewComponent {}
