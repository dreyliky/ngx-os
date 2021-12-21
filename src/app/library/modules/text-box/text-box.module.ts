import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { TextBoxComponent } from './components';

@NgModule({
    declarations: [
        TextBoxComponent
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        TextBoxComponent
    ]
})
export class TextBoxModule {}
