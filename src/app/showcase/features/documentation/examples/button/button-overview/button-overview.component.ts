import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-button-overview',
    templateUrl: './button-overview.component.html',
    styleUrls: ['./button-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonOverviewComponent {}
