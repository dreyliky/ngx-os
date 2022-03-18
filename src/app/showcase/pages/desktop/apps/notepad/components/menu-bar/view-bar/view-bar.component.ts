import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'notepad-menu-bar-view',
    templateUrl: './view-bar.component.html',
    styleUrls: ['./view-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewBarComponent {}
