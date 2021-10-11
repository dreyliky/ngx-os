import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { ComponentHeaderComponent } from './component-header.component';
import { ThemeSettingsComponent } from './theme-settings/theme-settings.component';

@NgModule({
    declarations: [
        ComponentHeaderComponent,
        ThemeSettingsComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule
    ],
    exports: [
        ComponentHeaderComponent
    ]
})
export class ComponentHeaderModule {}
