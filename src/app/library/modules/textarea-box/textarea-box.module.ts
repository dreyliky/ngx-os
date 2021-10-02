import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { TextareaBoxComponent } from './components';

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
