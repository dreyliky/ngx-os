import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ThemeAccentColorsComponent, ThemeDropdownComponent } from './components';

@NgModule({
    declarations: [
        ThemeDropdownComponent,
        ThemeAccentColorsComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ThemeDropdownComponent,
        ThemeAccentColorsComponent
    ]
})
export class ThemeModule {}
