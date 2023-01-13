import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import {
    AutofocusDirective,
    InputDirective,
    InputNumberDirective
} from './directives';

@NgModule({
    declarations: [
        InputDirective,
        InputNumberDirective,
        AutofocusDirective
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        InputDirective,
        InputNumberDirective,
        AutofocusDirective
    ]
})
export class InputModule {}
