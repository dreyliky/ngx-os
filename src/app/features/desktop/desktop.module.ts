import { NgModule } from '@angular/core';
import { DesktopComponent } from './desktop.component';
import { SharedModule } from '@Doc/doc-shared.module';

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
