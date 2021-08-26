import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'settings-app',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsAppComponent {}
