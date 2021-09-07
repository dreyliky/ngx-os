import { NgModule } from '@angular/core';
import { SharedModule } from '@lib-shared';
import { HeaderComponent, LabelComponent, TextComponent } from './components';

@NgModule({
    declarations: [
        TextComponent,
        HeaderComponent,
        LabelComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        TextComponent,
        HeaderComponent,
        LabelComponent
    ]
})
export class TextModule {}
