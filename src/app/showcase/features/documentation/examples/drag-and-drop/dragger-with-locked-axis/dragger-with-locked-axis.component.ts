import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DraggerConfigModel, DragStrategyByTranslate3d } from 'ngx-os';

@Component({
    selector: 'showcase-dragger-with-locked-axis',
    templateUrl: './dragger-with-locked-axis.component.html',
    styleUrls: ['./dragger-with-locked-axis.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggerWithLockedAxisComponent {
    public firstDraggerConfig: DraggerConfigModel = {
        strategy: new DragStrategyByTranslate3d({
            isLockAxisX: true
        })
    };

    public secondDraggerConfig: DraggerConfigModel = {
        strategy: new DragStrategyByTranslate3d({
            isLockAxisY: true
        })
    };
}
