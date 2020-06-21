import { NgModule } from '@angular/core';
import { TestModule } from './test';
import { BrowserModule } from './browser';

@NgModule({
    imports: [
        TestModule,
        BrowserModule
    ],
    exports: [
        TestModule,
        BrowserModule
    ]
})
export class FeaturesModule {}
