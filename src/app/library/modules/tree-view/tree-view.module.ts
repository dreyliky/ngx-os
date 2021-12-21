import { NgModule } from '@angular/core';
import { ScrollViewModule } from '../scroll-view';
import { ɵSharedModule } from '../shared.module';
import { TreeViewComponent } from './components';

@NgModule({
    declarations: [
        TreeViewComponent
    ],
    imports: [
        ɵSharedModule,
        ScrollViewModule
    ],
    exports: [
        TreeViewComponent
    ]
})
export class TreeViewModule {}
