import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { HeaderComponent, LabelComponent, TextComponent } from './components';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
    declarations: [
        TextComponent,
        HeaderComponent,
        LabelComponent,
        ErrorComponent
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        TextComponent,
        HeaderComponent,
        LabelComponent,
        ErrorComponent
    ]
})
export class TextModule {}
