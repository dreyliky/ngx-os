import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { FormFieldComponent } from './components';

@NgModule({
    declarations: [
        FormFieldComponent
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        FormFieldComponent
    ]
})
export class FormFieldModule {}
