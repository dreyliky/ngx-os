import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { PasswordBoxComponent } from './components';

@NgModule({
    declarations: [
        PasswordBoxComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        PasswordBoxComponent
    ]
})
export class PasswordBoxModule {}
