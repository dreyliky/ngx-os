import { NgModule } from '@angular/core';
import { CalculatorModule } from './calculator';
import { ExperimentsAppModule } from './experiments';
import { ImageViewerAppModule } from './image-viewer';
import { NotepadAppModule } from './notepad';
import { OverviewAppModule } from './overview';
import { SettingsAppModule } from './settings';
import { ShutDownAppModule } from './shut-down';

@NgModule({
    exports: [
        OverviewAppModule,
        SettingsAppModule,
        NotepadAppModule,
        ShutDownAppModule,
        ExperimentsAppModule,
        CalculatorModule,
        ImageViewerAppModule
    ]
})
export class DesktopAppsModule {}
