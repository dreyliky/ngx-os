import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { SliderComponent } from './components';

@NgModule({
    declarations: [
        SliderComponent
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        SliderComponent
    ]
})
export class SliderModule {}
