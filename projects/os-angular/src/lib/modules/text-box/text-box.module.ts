import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextBoxComponent } from './text-box.component';
import { SharedModule } from '../../shared.module';

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
