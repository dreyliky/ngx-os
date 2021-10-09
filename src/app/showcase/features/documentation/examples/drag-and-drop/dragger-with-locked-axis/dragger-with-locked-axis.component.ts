import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DragStrategyByTranslate3d, IDraggerConfig } from 'ngx-os/modules';

@Component({
    selector: 'showcase-dragger-with-locked-axis',
    templateUrl: './dragger-with-locked-axis.component.html',
    styleUrls: ['./dragger-with-locked-axis.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggerWithLockedAxisComponent {
    public firstDraggerConfig: IDraggerConfig = {
        strategy: new DragStrategyByTranslate3d({
            isLockAxisX: true
        })
    };

    public secondDraggerConfig: IDraggerConfig = {
        strategy: new DragStrategyByTranslate3d({
            isLockAxisY: true
        })
    };
}
