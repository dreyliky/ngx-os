import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { DesktopAppsModule } from './apps';
import { DesktopComponent } from './desktop.component';
import { DesktopRoutingModule } from './desktop.routing';

@NgModule({
    declarations: [
        DesktopComponent
    ],
    imports: [
        SharedModule,
        DesktopRoutingModule,
        DesktopAppsModule
    ]
})
export class DesktopPageModule {}
