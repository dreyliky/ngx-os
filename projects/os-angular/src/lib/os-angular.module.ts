import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';

import {
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    FieldRowModule
} from './modules';

@NgModule({
    imports: [
        SharedModule,

        ButtonModule,
        FieldRowModule,
        CheckboxModule,
        RadioButtonModule
    ],
    exports: [
        ButtonModule,
        FieldRowModule,
        CheckboxModule,
        RadioButtonModule
    ]
})
export class OsAngularModule {}
