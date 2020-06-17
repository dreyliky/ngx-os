import { NgModule } from '@angular/core';
import { TextareaBoxComponent } from './textarea-box.component';
import { SharedModule } from '../../shared.module';

@NgModule({
    declarations: [
        TextareaBoxComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        TextareaBoxComponent
    ]
})
export class TextareaBoxModule {}
