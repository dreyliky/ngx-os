import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { RadioButtonComponent } from './components';

@NgModule({
    declarations: [
        RadioButtonComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        RadioButtonComponent
    ]
})
export class RadioButtonModule {}