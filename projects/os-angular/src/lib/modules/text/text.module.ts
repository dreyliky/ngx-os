import { NgModule } from '@angular/core';
import { SharedModule } from 'os-angular/shared.module';
import { TextComponent } from './components';

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
