import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { FeaturesModule } from '@Features/features.module';
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
