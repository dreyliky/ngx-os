import { NgModule } from '@angular/core';
import { SharedModule } from '@lib-shared';
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
