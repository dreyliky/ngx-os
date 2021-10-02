import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-window-title-bar',
    templateUrl: './window-title-bar.component.html',
    styleUrls: ['./window-title-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WindowTitleBarComponent {}
