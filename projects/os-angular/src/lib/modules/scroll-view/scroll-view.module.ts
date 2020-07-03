import { NgModule } from '@angular/core';
import { SharedModule } from 'os-angular/shared.module';
import { ScrollViewComponent } from './scroll-view.component';

@NgModule({
    declarations: [
        ScrollViewComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ScrollViewComponent
    ]
})
export class ScrollViewModule {}
