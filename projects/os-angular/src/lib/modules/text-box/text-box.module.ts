import { NgModule } from '@angular/core';
import { SharedModule } from '@lib';
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
