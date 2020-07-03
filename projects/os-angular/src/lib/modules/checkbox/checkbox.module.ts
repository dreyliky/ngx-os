import { NgModule } from '@angular/core';
import { SharedModule } from 'os-angular/shared.module';
import { CheckboxComponent } from './components';

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
