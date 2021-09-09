import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-resizer-overview',
    templateUrl: './resizer-overview.component.html',
    styleUrls: ['./resizer-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResizerOverviewComponent {}
