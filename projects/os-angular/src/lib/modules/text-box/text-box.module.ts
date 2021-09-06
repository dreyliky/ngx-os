import { NgModule } from '@angular/core';
import { SharedModule } from '@lib-shared';
import { FieldRowComponent, LabelComponent, TextareaBoxComponent, TextBoxComponent } from './components';

@NgModule({
    declarations: [
        TextBoxComponent,
        TextareaBoxComponent,
        FieldRowComponent,
        LabelComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        TextBoxComponent,
        TextareaBoxComponent,
        FieldRowComponent,
        LabelComponent
    ]
})
export class TextBoxModule {}
