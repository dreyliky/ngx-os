import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IResizerConfig, ResizerEnum } from 'ngx-os/modules';

@Component({
    selector: 'showcase-resizer-specific-sides',
    templateUrl: './resizer-specific-sides.component.html',
    styleUrls: ['./resizer-specific-sides.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResizerSpecificSidesComponent {
    public readonly resizerConfig: IResizerConfig = {
        isAllowChangePosition: false,
        allowedResizers: [
            ResizerEnum.Right,
            ResizerEnum.BottomRight,
            ResizerEnum.Bottom
        ]
    };
}
