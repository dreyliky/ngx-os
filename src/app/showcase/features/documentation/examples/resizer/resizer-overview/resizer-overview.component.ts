import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResizerConfig } from 'ngx-os';

@Component({
    selector: 'showcase-resizer-overview',
    templateUrl: './resizer-overview.component.html',
    styleUrls: ['./resizer-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResizerOverviewComponent {
    public readonly resizerConfig: ResizerConfig = {
        isAllowChangePosition: false
    };
}
