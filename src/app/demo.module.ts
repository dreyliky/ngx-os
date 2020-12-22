import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './demo.routing';
import { DemoComponent } from './demo.component';
import { SharedModule } from './demo-shared.module';
import { FeaturesModule } from '@Features/features.module';
import { LayoutsModule } from '@Layouts/layouts.module';
import { DemoConfig } from './demo.config';

@NgModule({
    declarations: [
        DemoComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,

        SharedModule,
        FeaturesModule,
        LayoutsModule
    ],
    bootstrap: [
        DemoComponent
    ],
    providers: [
        DemoConfig,
        { provide: APP_INITIALIZER, useFactory: (config: DemoConfig) => () => config.load(), deps: [DemoConfig], multi: true }
    ]
})
export class DemoModule {}
