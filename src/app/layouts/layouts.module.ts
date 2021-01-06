import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ComponentLayoutComponent } from './component-layout';
import { LayoutComponentsModule } from './components/layout-components.module';
import { MainLayoutComponent } from './main-layout';

@NgModule({
    declarations: [
        ComponentLayoutComponent,
        MainLayoutComponent
    ],
    imports: [
        SharedModule,
        LayoutComponentsModule
    ],
    exports: [
        ComponentLayoutComponent,
        MainLayoutComponent
    ]
})
export class LayoutsModule {}
