import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeaturesModule } from '@features';
import { LayoutsModule } from '@layouts';
import {
    NgxBaseStateDevtoolsConfig,
    NgxBaseStateDevtoolsModule,
    NGX_BASE_STATE_DEVTOOLS_CONFIG
} from 'ngx-base-state';
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

        NgxBaseStateDevtoolsModule,
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
        },
        {
            provide: NGX_BASE_STATE_DEVTOOLS_CONFIG,
            useValue: new NgxBaseStateDevtoolsConfig({
                isEnabled: true
            })
        }
    ]
})
export class ShowcaseModule {}
