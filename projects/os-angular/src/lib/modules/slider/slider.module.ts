import { NgModule } from '@angular/core';
import { SharedModule } from 'os-angular/shared.module';
import { SliderComponent } from './components';

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
