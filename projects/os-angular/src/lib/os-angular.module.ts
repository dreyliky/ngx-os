import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';

import {
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    FieldRowModule,
    GroupBoxModule
} from './modules';
import { TextBoxModule } from './modules/text-box';

@NgModule({
    imports: [
        SharedModule,

        ButtonModule,
        FieldRowModule,
        TextBoxModule,
        CheckboxModule,
        RadioButtonModule,
        GroupBoxModule
    ],
    exports: [
        ButtonModule,
        FieldRowModule,
        TextBoxModule,
        CheckboxModule,
        RadioButtonModule,
        GroupBoxModule
    ]
})
export class OsAngularModule {}
