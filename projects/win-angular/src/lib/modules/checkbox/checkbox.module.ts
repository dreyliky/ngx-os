import { NgModule } from '@angular/core';
import { CheckboxComponent } from './checkbox.component';
import { SharedModule } from '../../shared.module';

@NgModule({
    declarations: [
        CheckboxComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        CheckboxComponent
    ]
})
export class CheckboxModule {}
