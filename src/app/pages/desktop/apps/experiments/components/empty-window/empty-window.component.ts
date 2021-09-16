import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-empty-window',
    templateUrl: './empty-window.component.html',
    styleUrls: ['./empty-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyWindowComponent {}
