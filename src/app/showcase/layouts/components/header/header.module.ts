import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { HeaderComponent } from './header.component';
import { ThemeSettingsComponent } from './theme-settings/theme-settings.component';

@NgModule({
    declarations: [
        HeaderComponent,
        ThemeSettingsComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule {}
