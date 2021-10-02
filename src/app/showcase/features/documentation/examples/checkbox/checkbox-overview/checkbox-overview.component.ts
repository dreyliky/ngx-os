import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-checkbox-overview',
    templateUrl: './checkbox-overview.component.html',
    styleUrls: ['./checkbox-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxOverviewComponent {}
