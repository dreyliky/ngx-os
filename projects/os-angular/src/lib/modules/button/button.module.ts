import { NgModule } from '@angular/core';
import { SharedModule } from '@lib';
import { ButtonComponent } from './components';

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
