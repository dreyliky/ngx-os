import { NgModule } from '@angular/core';
import { RadioButtonComponent } from './radio-button.component';
import { SharedModule } from '../../shared.module';

@NgModule({
    declarations: [
        RadioButtonComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        RadioButtonComponent
    ]
})
export class RadioButtonModule {}
