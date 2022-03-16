import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-hint-overview',
    templateUrl: './hint-overview.component.html',
    styleUrls: ['./hint-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HintOverviewComponent {
    public hintDisplayDelay = 500;
    public hintMouseOffsetX = 16;
    public hintMouseOffsetY = 16;
}
