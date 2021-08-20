import { NgModule } from '@angular/core';
import { SharedModule } from '@lib';
import { HeaderComponent, TextComponent } from './components';

@NgModule({
    declarations: [
        TextComponent,
        HeaderComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        TextComponent,
        HeaderComponent
    ]
})
export class TextModule {}
