import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { FeaturesModule } from '@Features';
import { ContentComponent, SidebarComponent } from './components';
import { AccentColorComponent, BackgroundSectionModule, ThemeComponent } from './containers';
import { SettingsAppComponent } from './settings.component';

@NgModule({
    declarations: [
        SettingsAppComponent,
        SidebarComponent,
        ContentComponent,
        ThemeComponent,
        AccentColorComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        BackgroundSectionModule
    ]
})
export class SettingsAppModule {}