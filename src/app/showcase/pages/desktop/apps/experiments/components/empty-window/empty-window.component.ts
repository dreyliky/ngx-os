import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-empty-window',
    templateUrl: './empty-window.component.html',
    styleUrls: ['./empty-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyWindowComponent {}
