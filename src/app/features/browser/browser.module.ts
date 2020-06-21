import { NgModule } from '@angular/core';
import { BrowserComponent } from './browser.component';
import { SharedModule } from 'src/app/app-shared.module';

@NgModule({
    declarations: [
        BrowserComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        BrowserComponent
    ],
    entryComponents: [
        BrowserComponent
    ]
})
export class BrowserModule {}
