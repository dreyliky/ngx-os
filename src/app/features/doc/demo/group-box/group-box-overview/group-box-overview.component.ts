import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-group-box-overview',
    templateUrl: './group-box-overview.component.html',
    styleUrls: ['./group-box-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupBoxOverviewComponent {}
