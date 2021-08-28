import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { DesktopAppsModule } from './apps';
import { DesktopComponent } from './desktop.component';
import { DesktopRoutingModule } from './desktop.routing';
import { BackgroundService } from './features/background';
import { ExecService } from './features/exec';
import { TaskbarModule } from './modules';

@NgModule({
    declarations: [
        DesktopComponent
    ],
    imports: [
        SharedModule,
        DesktopRoutingModule,
        TaskbarModule,
        DesktopAppsModule
    ],
    providers: [
        ExecService,
        BackgroundService
    ]
})
export class DesktopPageModule {}
