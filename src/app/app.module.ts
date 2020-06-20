import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './app-shared.module';
import { FeaturesModule } from './features/features.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,

        SharedModule,
        FeaturesModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
