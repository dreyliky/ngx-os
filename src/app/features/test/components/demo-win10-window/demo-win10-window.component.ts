import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-demo-win10-window',
    templateUrl: './demo-win10-window.component.html',
    styleUrls: ['./demo-win10-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoWin10WindowComponent {}
