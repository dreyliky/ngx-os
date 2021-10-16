import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import {
    ThemeAccentColorDropdownComponent,
    ThemeAccentColorsComponent,
    ThemeDropdownComponent
} from './components';

@NgModule({
    declarations: [
        ThemeDropdownComponent,
        ThemeAccentColorsComponent,
        ThemeAccentColorDropdownComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ThemeDropdownComponent,
        ThemeAccentColorsComponent,
        ThemeAccentColorDropdownComponent
    ]
})
export class ThemeModule {}
