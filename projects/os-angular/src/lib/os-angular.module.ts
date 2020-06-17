import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';

import {
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    FieldRowModule,
    GroupBoxModule,
    SliderModule
} from './modules';
import { TextBoxModule } from './modules/text-box';
import { TextareaBoxModule } from './modules/textarea-box';
import { TabGroupModule } from './modules/tab-group';

@NgModule({
    imports: [
        SharedModule,

        ButtonModule,
        FieldRowModule,
        TextBoxModule,
        TextareaBoxModule,
        CheckboxModule,
        RadioButtonModule,
        GroupBoxModule,
        SliderModule,
        TabGroupModule
    ],
    exports: [
        ButtonModule,
        FieldRowModule,
        TextBoxModule,
        TextareaBoxModule,
        CheckboxModule,
        RadioButtonModule,
        GroupBoxModule,
        SliderModule,
        TabGroupModule
    ]
})
export class OsAngularModule {}
