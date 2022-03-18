import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'notepad-font-window',
    templateUrl: './font-window.component.html',
    styleUrls: ['./font-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FontWindowComponent {}
