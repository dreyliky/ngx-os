import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DraggerConfig, DragStrategyByTranslate3d } from 'ngx-os';

@Component({
    selector: 'showcase-dragger-with-locked-axis',
    templateUrl: './dragger-with-locked-axis.component.html',
    styleUrls: ['./dragger-with-locked-axis.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggerWithLockedAxisComponent {
    public firstDraggerConfig: DraggerConfig = {
        strategy: new DragStrategyByTranslate3d({
            isLockAxisX: true
        })
    };

    public secondDraggerConfig: DraggerConfig = {
        strategy: new DragStrategyByTranslate3d({
            isLockAxisY: true
        })
    };
}
