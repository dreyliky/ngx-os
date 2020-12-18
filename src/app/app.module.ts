import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { SharedModule } from './doc-shared.module';
import { FeaturesModule } from '@Features/features.module';
import { LayoutsModule } from '@Layouts/layouts.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,

        SharedModule,
        FeaturesModule,
        LayoutsModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
