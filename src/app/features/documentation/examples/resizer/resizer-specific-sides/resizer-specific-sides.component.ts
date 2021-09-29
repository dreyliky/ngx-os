import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IResizerParams, ResizerEnum } from '@lib-modules';

@Component({
    selector: 'demo-resizer-specific-sides',
    templateUrl: './resizer-specific-sides.component.html',
    styleUrls: ['./resizer-specific-sides.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResizerSpecificSidesComponent {
    public readonly resizerConfig: IResizerParams = {
        isAllowChangePosition: false,
        allowedResizers: [
            ResizerEnum.right,
            ResizerEnum.bottomRight,
            ResizerEnum.bottom
        ]
    };
}
