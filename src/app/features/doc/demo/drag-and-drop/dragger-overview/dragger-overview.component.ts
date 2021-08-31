import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-dragger-overview',
    templateUrl: './dragger-overview.component.html',
    styleUrls: ['./dragger-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggerOverviewComponent {}
