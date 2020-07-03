import { NgModule } from '@angular/core';
import { SharedModule } from 'os-angular/shared.module';
import { TextBoxComponent } from './components';

@NgModule({
    declarations: [
        TextBoxComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        TextBoxComponent
    ]
})
export class TextBoxModule {}
