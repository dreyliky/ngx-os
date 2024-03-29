import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { ContentComponent, SidebarComponent } from './components';
import {
    AccentColorComponent,
    BackgroundSectionModule,
    GeneralComponent,
    ShortcutsComponent,
    TaskbarComponent,
    ThemeComponent
} from './containers';
import { SettingsAppComponent } from './settings.component';

@NgModule({
    declarations: [
        SettingsAppComponent,
        SidebarComponent,
        ContentComponent,
        ThemeComponent,
        AccentColorComponent,
        ShortcutsComponent,
        TaskbarComponent,
        GeneralComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        BackgroundSectionModule
    ]
})
export class SettingsAppModule {}
