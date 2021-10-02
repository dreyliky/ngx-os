import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeaturesModule } from '@features/features.module';
import { LayoutsModule } from '@layouts';
import { SharedModule } from './shared/shared.module';
import { ShowcaseComponent } from './showcase.component';
import { ShowcaseConfig } from './showcase.config';
import { AppRoutingModule } from './showcase.routing';

@NgModule({
    declarations: [
        ShowcaseComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,

        SharedModule,
        FeaturesModule,
        LayoutsModule
    ],
    bootstrap: [
        ShowcaseComponent
    ],
    providers: [
        ShowcaseConfig,
        {
            provide: APP_INITIALIZER,
            useFactory: (config: ShowcaseConfig) => () => config.load(),
            deps: [ShowcaseConfig],
            multi: true
        }
    ]
})
export class ShowcaseModule {}
