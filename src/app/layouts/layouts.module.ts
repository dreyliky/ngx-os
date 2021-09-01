import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ComponentHeaderComponent } from './components';
import { ComponentOverviewLayoutComponent, MainLayoutComponent } from './containers';

@NgModule({
    declarations: [
        ComponentHeaderComponent,
        ComponentOverviewLayoutComponent,
        MainLayoutComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ComponentOverviewLayoutComponent,
        MainLayoutComponent
    ]
})
export class LayoutsModule {}
