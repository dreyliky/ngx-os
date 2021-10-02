import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IResizerParams } from 'ngx-os/modules';

@Component({
    selector: 'demo-resizer-overview',
    templateUrl: './resizer-overview.component.html',
    styleUrls: ['./resizer-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResizerOverviewComponent {
    public readonly resizerConfig: IResizerParams = {
        isAllowChangePosition: false
    };
}
