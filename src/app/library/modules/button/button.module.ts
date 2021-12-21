import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { ButtonComponent } from './components';

@NgModule({
    declarations: [
        ButtonComponent
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        ButtonComponent
    ]
})
export class ButtonModule {}
