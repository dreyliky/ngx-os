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
    TextBoxModule,
    TextareaBoxModule,
    TabGroupModule
} from './modules';
import { WindowModule } from './modules/window';

@NgModule({
    imports: [
        SharedModule,

        ButtonModule,
        FieldRowModule,
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
