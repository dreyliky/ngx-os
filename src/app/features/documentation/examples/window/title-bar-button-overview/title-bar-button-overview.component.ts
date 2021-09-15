import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-title-bar-button-overview',
    templateUrl: './title-bar-button-overview.component.html',
    styleUrls: ['./title-bar-button-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarButtonOverviewComponent {}
