import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { DesktopAppsModule } from './apps';
import { DesktopComponent } from './desktop.component';
import { DesktopRoutingModule } from './desktop.routing';
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
    ]
})
export class DesktopPageModule {}
