import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DragStrategyByTranslate3d, IDraggerParams } from 'ngx-os/modules';

@Component({
    selector: 'demo-dragger-with-locked-axis',
    templateUrl: './dragger-with-locked-axis.component.html',
    styleUrls: ['./dragger-with-locked-axis.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggerWithLockedAxisComponent {
    public firstDraggerConfig: IDraggerParams = {
        strategy: new DragStrategyByTranslate3d({
            isLockAxisX: true
        })
    };

    public secondDraggerConfig: IDraggerParams = {
        strategy: new DragStrategyByTranslate3d({
            isLockAxisY: true
        })
    };
}
