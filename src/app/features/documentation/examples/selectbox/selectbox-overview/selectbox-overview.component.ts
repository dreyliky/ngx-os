import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-selectbox-overview',
    templateUrl: './selectbox-overview.component.html',
    styleUrls: ['./selectbox-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectboxOverviewComponent {}
