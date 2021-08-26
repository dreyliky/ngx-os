import { NgModule } from '@angular/core';
import { SharedModule } from '@Doc/demo-shared.module';
import { SettingsAppComponent } from './settings.component';

@NgModule({
    declarations: [
        SettingsAppComponent
    ],
    imports: [
        SharedModule
    ]
})
export class SettingsAppModule {}
