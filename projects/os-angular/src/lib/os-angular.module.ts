import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';

import {
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    FieldRowModule,
    GroupBoxModule
} from './modules';

@NgModule({
    imports: [
        SharedModule,

        ButtonModule,
        FieldRowModule,
        CheckboxModule,
        RadioButtonModule,
        GroupBoxModule
    ],
    exports: [
        ButtonModule,
        FieldRowModule,
        CheckboxModule,
        RadioButtonModule,
        GroupBoxModule
    ]
})
export class OsAngularModule {}
