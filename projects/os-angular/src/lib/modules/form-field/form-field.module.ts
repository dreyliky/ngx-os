import { NgModule } from '@angular/core';
import { SharedModule } from '@lib-shared';
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
