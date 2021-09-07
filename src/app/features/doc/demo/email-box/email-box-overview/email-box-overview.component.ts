import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-email-box-overview',
    templateUrl: './email-box-overview.component.html',
    styleUrls: ['./email-box-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailBoxOverviewComponent {}
