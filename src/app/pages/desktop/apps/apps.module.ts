import { NgModule } from '@angular/core';
import { NotepadAppModule } from './notepad';
import { OverviewAppModule } from './overview';
import { SettingsAppModule } from './settings';

@NgModule({
    exports: [
        OverviewAppModule,
        SettingsAppModule,
        NotepadAppModule
    ]
})
export class DesktopAppsModule {}
