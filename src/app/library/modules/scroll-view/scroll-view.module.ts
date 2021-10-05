import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { ScrollViewComponent } from './components';

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