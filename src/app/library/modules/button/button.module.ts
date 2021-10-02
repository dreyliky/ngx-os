import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
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
