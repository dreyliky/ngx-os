import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { ThemeDropdownComponent } from './components';

@NgModule({
    declarations: [
        ThemeDropdownComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ThemeDropdownComponent
    ]
})
export class ThemeModule {}
