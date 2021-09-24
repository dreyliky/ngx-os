import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeaturesModule } from '@Features/features.module';
import { LayoutsModule } from '@Layouts';
import { SHARED_DYNAMIC_WINDOW_CONFIG } from '@lib-modules';
import { SharedModule } from './demo-shared.module';
import { DemoComponent } from './demo.component';
import { DemoConfig } from './demo.config';
import { AppRoutingModule } from './demo.routing';
import { tst } from './tst';

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
        },
        // FIXME: Refactor
        {
            provide: SHARED_DYNAMIC_WINDOW_CONFIG,
            useFactory: tst
        }
    ]
})
export class DemoModule {}
