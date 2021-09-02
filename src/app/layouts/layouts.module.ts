import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { FeaturesModule } from '@Features/features.module';
import { ComponentHeaderModule } from './components';
import { ComponentOverviewLayoutComponent, MainLayoutComponent } from './containers';

@NgModule({
    declarations: [
        ComponentOverviewLayoutComponent,
        MainLayoutComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        ComponentHeaderModule
    ],
    exports: [
        ComponentOverviewLayoutComponent,
        MainLayoutComponent
    ]
})
export class LayoutsModule {}
