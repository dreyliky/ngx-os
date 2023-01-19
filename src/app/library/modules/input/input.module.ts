import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { InputNumberComponent } from './components';
import {
    AutofocusDirective,
    InputDirective
} from './directives';

@NgModule({
    declarations: [
        InputDirective,
        AutofocusDirective,
        InputNumberComponent
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        InputDirective,
        AutofocusDirective,
        InputNumberComponent
    ]
})
export class InputModule {}
