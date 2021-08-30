import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-window-overview',
    templateUrl: './window-overview.component.html',
    styleUrls: ['./window-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WindowOverviewComponent {}
