import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { FeaturesModule } from '@Features/features.module';
import { ComponentHeaderModule } from './components';
import { MainLayoutComponent } from './containers';

@NgModule({
    declarations: [
        MainLayoutComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        ComponentHeaderModule
    ],
    exports: [
        MainLayoutComponent
    ]
})
export class LayoutsModule {}
