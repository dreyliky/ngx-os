import { NgModule } from '@angular/core';
import { ScrollViewComponent } from './scroll-view.component';
import { SharedModule } from '../../shared.module';

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
