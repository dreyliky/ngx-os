import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ComponentHeaderComponent } from './component-header/component-header.component';

@NgModule({
    declarations: [
        ComponentHeaderComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ComponentHeaderComponent
    ]
})
export class LayoutComponentsModule {}
