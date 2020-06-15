import { NgModule } from '@angular/core';
import { ButtonComponent } from './button.component';
import { SharedModule } from '../../shared.module';

@NgModule({
    declarations: [
        ButtonComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ButtonComponent
    ]
})
export class ButtonModule {}
