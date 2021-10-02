import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features/features.module';
import { SharedModule } from '@shared';
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
