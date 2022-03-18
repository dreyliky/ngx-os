import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'notepad-menu-bar-edit',
    templateUrl: './edit-bar.component.html',
    styleUrls: ['./edit-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditBarComponent {}
