import { NgModule } from '@angular/core';
import { NotepadAppModule } from './notepad';
import { OverviewAppModule } from './overview';
import { SettingsAppModule } from './settings';
import { ShutDownAppModule } from './shut-down';

@NgModule({
    exports: [
        OverviewAppModule,
        SettingsAppModule,
        NotepadAppModule,
        ShutDownAppModule
    ]
})
export class DesktopAppsModule {}
