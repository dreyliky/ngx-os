import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { HeaderComponent, LabelComponent, TextComponent } from './components';

@NgModule({
    declarations: [
        TextComponent,
        HeaderComponent,
        LabelComponent
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        TextComponent,
        HeaderComponent,
        LabelComponent
    ]
})
export class TextModule {}
