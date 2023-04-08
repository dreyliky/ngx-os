import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-divider-overview',
    templateUrl: './divider-overview.component.html',
    styleUrls: ['./divider-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DividerOverviewComponent {}
