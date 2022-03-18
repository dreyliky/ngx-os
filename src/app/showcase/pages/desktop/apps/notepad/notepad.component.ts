import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'notepad-app',
    templateUrl: './notepad.component.html',
    styleUrls: ['./notepad.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotepadAppComponent {}
