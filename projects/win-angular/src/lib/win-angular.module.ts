import { NgModule } from '@angular/core';
import { ThemeService } from './services';
import { ThemeEnum } from './enums';
import { ButtonModule } from './modules';
import { SharedModule } from './shared.module';
import { CheckboxModule } from './modules/checkbox/checkbox.module';

@NgModule({
    imports: [
        SharedModule,

        ButtonModule,
        CheckboxModule
    ],
    exports: [
        ButtonModule,
        CheckboxModule
    ],
    providers: [
        ThemeService
    ]
})
export class WinAngularModule {

    constructor (
        private readonly themeService: ThemeService
    ) {
        this.themeService.applyTheme(ThemeEnum.WinXP);
    }

}
