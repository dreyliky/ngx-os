import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { ScrollViewComponent } from './components';

@NgModule({
    declarations: [
        ScrollViewComponent
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        ScrollViewComponent
    ]
})
export class ScrollViewModule {}
