import { NgModule } from '@angular/core';
import { TestModule } from './test';
import { BrowserModule } from './browser';
import { DesktopModule } from './desktop';

@NgModule({
    imports: [
        TestModule,
        BrowserModule,
        DesktopModule
    ],
    exports: [
        TestModule,
        BrowserModule,
        DesktopModule
    ]
})
export class FeaturesModule {}
