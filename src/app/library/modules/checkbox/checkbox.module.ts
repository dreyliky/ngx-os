import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { CheckboxComponent } from './components';

@NgModule({
    declarations: [
        CheckboxComponent
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        CheckboxComponent
    ]
})
export class CheckboxModule {}
