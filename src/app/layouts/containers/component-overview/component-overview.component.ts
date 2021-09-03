import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-component-overview-layout',
    templateUrl: './component-overview.component.html',
    styleUrls: ['./component-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentOverviewLayoutComponent {}
