import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-checkbox-overview',
    templateUrl: './checkbox-overview.component.html',
    styleUrls: ['./checkbox-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxOverviewComponent {}
