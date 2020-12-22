import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { LayoutComponentsModule } from './components/layout-components.module';
import { ComponentLayoutComponent } from './component-layout';

@NgModule({
    declarations: [
        ComponentLayoutComponent
    ],
    imports: [
        SharedModule,
        LayoutComponentsModule
    ],
    exports: [
        ComponentLayoutComponent
    ]
})
export class LayoutsModule {}
