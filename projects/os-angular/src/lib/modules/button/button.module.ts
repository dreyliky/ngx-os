import { NgModule } from '@angular/core';
import { SharedModule } from 'os-angular/shared.module';
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
