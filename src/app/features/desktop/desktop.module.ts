import { NgModule } from '@angular/core';
import { DesktopComponent } from './desktop.component';
import { SharedModule } from 'src/app/app-shared.module';

@NgModule({
    declarations: [
        DesktopComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        DesktopComponent
    ]
})
export class DesktopModule {}
