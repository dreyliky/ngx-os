import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DesktopAppsModule } from './apps';
import { DesktopComponent } from './desktop.component';
import { DesktopRoutingModule } from './desktop.routing';
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
    ]
})
export class DesktopPageModule {}
