import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'notepad-menu-bar-file',
    templateUrl: './file-bar.component.html',
    styleUrls: ['./file-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileBarComponent {}
