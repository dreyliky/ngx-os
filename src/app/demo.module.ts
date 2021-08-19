import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeaturesModule } from '@Features/features.module';
import { LayoutsModule } from '@Layouts/layouts.module';
import { SharedModule } from './demo-shared.module';
import { DemoComponent } from './demo.component';
import { DemoConfig } from './demo.config';
import { AppRoutingModule } from './demo.routing';

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
        {
            provide: APP_INITIALIZER,
            useFactory: (config: DemoConfig) => () => config.load(),
            deps: [DemoConfig],
            multi: true
        }
    ]
})
export class DemoModule {}
