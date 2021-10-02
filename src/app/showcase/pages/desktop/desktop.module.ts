import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DynamicWindowService } from 'ngx-os/modules';
import { DesktopAppsModule } from './apps';
import { DesktopComponent } from './desktop.component';
import { DesktopRoutingModule } from './desktop.routing';
import { BackgroundService } from './features/background';
import { ExecService } from './features/exec';
import { ShortcutSettingsService } from './features/shortcut';
import { ShortcutsZoneModule, TaskbarModule } from './modules';

@NgModule({
    declarations: [
        DesktopComponent
    ],
    imports: [
        SharedModule,
        DesktopRoutingModule,
        TaskbarModule,
        DesktopAppsModule,
        ShortcutsZoneModule
    ],
    providers: [
        DynamicWindowService,
        ExecService,
        BackgroundService,
        ShortcutSettingsService
    ]
})
export class DesktopPageModule {}
