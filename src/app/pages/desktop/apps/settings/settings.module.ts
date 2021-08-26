import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { FeaturesModule } from '@Features';
import { ContentComponent, SidebarComponent } from './components';
import { AccentColorComponent, BackgroundComponent, ThemeComponent } from './containers';
import { SettingsAppComponent } from './settings.component';

@NgModule({
    declarations: [
        SettingsAppComponent,
        SidebarComponent,
        ContentComponent,
        ThemeComponent,
        AccentColorComponent,
        BackgroundComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule
    ]
})
export class SettingsAppModule {}
