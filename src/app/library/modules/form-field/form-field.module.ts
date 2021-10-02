import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { FormFieldComponent } from './components';

@NgModule({
    declarations: [
        FormFieldComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        FormFieldComponent
    ]
})
export class FormFieldModule {}
