import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { RadioButtonComponent } from './components';

@NgModule({
    declarations: [
        RadioButtonComponent
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        RadioButtonComponent
    ]
})
export class RadioButtonModule {}
