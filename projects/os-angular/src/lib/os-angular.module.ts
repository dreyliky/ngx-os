import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';

import {
    ButtonModule,
    CheckboxModule
} from './modules';

@NgModule({
    imports: [
        SharedModule,

        ButtonModule,
        CheckboxModule
    ],
    exports: [
        ButtonModule,
        CheckboxModule
    ]
})
export class OsAngularModule {}
