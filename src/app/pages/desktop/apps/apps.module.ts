import { NgModule } from '@angular/core';
import { OverviewAppModule } from './overview';
import { SettingsAppModule } from './settings';

@NgModule({
    exports: [
        OverviewAppModule,
        SettingsAppModule
    ]
})
export class DesktopAppsModule {}
