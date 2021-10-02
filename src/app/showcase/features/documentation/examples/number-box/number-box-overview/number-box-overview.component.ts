import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-number-box-overview',
    templateUrl: './number-box-overview.component.html',
    styleUrls: ['./number-box-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberBoxOverviewComponent {}
