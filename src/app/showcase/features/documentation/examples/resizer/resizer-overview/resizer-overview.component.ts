import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ResizerConfigModel } from 'ngx-os/modules';

@Component({
    selector: 'showcase-resizer-overview',
    templateUrl: './resizer-overview.component.html',
    styleUrls: ['./resizer-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResizerOverviewComponent {
    public readonly resizerConfig: ResizerConfigModel = {
        isAllowChangePosition: false
    };
}
