import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { FeaturesModule } from '@Features';
import { BackgroundComponent } from './background.component';
import { ColorSelectionComponent, ImageSelectionComponent } from './components';

@NgModule({
    declarations: [
        BackgroundComponent,
        ImageSelectionComponent,
        ColorSelectionComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule
    ],
    exports: [
        BackgroundComponent
    ]
})
export class BackgroundSectionModule {}
