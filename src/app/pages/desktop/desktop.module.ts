import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/doc-shared.module';
import { DesktopModule } from '@Doc/features/desktop';
import { DesktopComponent } from './desktop.component';
import { DesktopRoutingModule } from './desktop.routing';

@NgModule({
    declarations: [
        DesktopComponent
    ],
    imports: [
        SharedModule,
        DesktopModule,

        DesktopRoutingModule
    ]
})
export class DesktopPageModule {}
