import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ThemeAccentColorDropdownComponent, ThemeAccentColorsComponent, ThemeDropdownComponent } from './components';

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
