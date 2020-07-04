import { NgModule } from '@angular/core';
import { SharedModule } from 'os-angular/shared.module';
import {
    TextComponent,
    HeaderComponent
} from './components';

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
