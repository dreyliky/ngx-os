import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AboutWindowComponent } from './about-window.component';

@NgModule({
    declarations: [
        AboutWindowComponent
    ],
    imports: [
        SharedModule
    ]
})
export class AboutWindowModule {}
