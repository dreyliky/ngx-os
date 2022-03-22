import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'experiments-empty-window',
    templateUrl: './empty-window.component.html',
    styleUrls: ['./empty-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyWindowComponent {}
