import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { FeaturesModule } from '@Features/features.module';
import { ComponentHeaderComponent } from './components';
import { ComponentOverviewLayoutComponent, MainLayoutComponent } from './containers';

@NgModule({
    declarations: [
        ComponentHeaderComponent,
        ComponentOverviewLayoutComponent,
        MainLayoutComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule
    ],
    exports: [
        ComponentOverviewLayoutComponent,
        MainLayoutComponent
    ]
})
export class LayoutsModule {}
