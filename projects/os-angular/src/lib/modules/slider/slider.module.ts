import { NgModule } from '@angular/core';
import { SharedModule } from 'os-angular/shared.module';
import { SliderComponent } from './slider.component';

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
