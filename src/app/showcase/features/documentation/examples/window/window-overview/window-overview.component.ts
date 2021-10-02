import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-window-overview',
    templateUrl: './window-overview.component.html',
    styleUrls: ['./window-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WindowOverviewComponent {
    public readonly isWindowActive = true;
}
