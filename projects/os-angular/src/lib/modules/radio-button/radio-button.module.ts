import { NgModule } from '@angular/core';
import { SharedModule } from 'os-angular/shared.module';
import { RadioButtonComponent } from './radio-button.component';

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
