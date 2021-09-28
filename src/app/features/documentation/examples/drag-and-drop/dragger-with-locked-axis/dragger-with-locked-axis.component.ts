import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DragStrategyByTranslate3d, IDraggerParams } from '@lib-modules';

@Component({
    selector: 'demo-dragger-with-locked-axis',
    templateUrl: './dragger-with-locked-axis.component.html',
    styleUrls: ['./dragger-with-locked-axis.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggerWithLockedAxisComponent {
    public draggerConfig: IDraggerParams = {
        strategy: new DragStrategyByTranslate3d({
            isLockAxisY: true
        })
    };
}
