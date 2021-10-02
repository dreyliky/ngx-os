import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
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
