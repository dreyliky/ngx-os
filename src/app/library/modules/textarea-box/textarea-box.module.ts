import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { TextareaBoxComponent } from './components';

@NgModule({
    declarations: [
        TextareaBoxComponent
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        TextareaBoxComponent
    ]
})
export class TextareaBoxModule {}
