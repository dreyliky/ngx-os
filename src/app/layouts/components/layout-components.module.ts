import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { FeaturesModule } from '@Features';
import { ComponentHeaderComponent } from './component-header';

@NgModule({
    declarations: [
        ComponentHeaderComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule
    ],
    exports: [
        ComponentHeaderComponent
    ]
})
export class LayoutComponentsModule {}
