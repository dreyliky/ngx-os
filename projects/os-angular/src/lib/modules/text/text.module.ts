import { NgModule } from '@angular/core';
import { TextComponent } from './text.component';
import { SharedModule } from '../../shared.module';

@NgModule({
    declarations: [
        TextComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        TextComponent
    ]
})
export class TextModule {}
