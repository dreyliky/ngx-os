import { NgModule } from '@angular/core';
import { SliderComponent } from './slider.component';
import { SharedModule } from '../../shared.module';

@NgModule({
    declarations: [
        SliderComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        SliderComponent
    ]
})
export class SliderModule {}
