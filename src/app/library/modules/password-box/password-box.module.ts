import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { PasswordBoxComponent } from './components';

@NgModule({
    declarations: [
        PasswordBoxComponent
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        PasswordBoxComponent
    ]
})
export class PasswordBoxModule {}
