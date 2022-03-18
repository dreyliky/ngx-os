import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'notepad-menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuBarComponent {}
