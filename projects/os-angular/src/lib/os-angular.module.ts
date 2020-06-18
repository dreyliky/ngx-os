import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';

import {
    ButtonModule,
    CheckboxModule,
    SelectboxModule,
    RadioButtonModule,
    FieldRowModule,
    GroupBoxModule,
    SliderModule,
    TextModule,
    TextBoxModule,
    TextareaBoxModule,
    TabGroupModule,
    WindowModule
} from './modules';

@NgModule({
    imports: [
        SharedModule,

        ButtonModule,
        FieldRowModule,
        TextModule,
        TextBoxModule,
        TextareaBoxModule,
        CheckboxModule,
        SelectboxModule,
        RadioButtonModule,
        GroupBoxModule,
        SliderModule,
        TabGroupModule,
        WindowModule
    ],
    exports: [
        ButtonModule,
        FieldRowModule,
        TextModule,
        TextBoxModule,
        TextareaBoxModule,
        CheckboxModule,
        SelectboxModule,
        RadioButtonModule,
        GroupBoxModule,
        SliderModule,
        TabGroupModule,
        WindowModule
    ]
})
export class OsAngularModule {}
