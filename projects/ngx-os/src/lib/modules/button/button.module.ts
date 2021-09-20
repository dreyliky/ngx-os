import { NgModule } from '@angular/core';
import { SharedModule } from '@lib-shared';
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
