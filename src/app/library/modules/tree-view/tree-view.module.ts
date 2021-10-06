import { NgModule } from '@angular/core';
import { ScrollViewModule } from '../scroll-view';
import { SharedModule } from '../shared.module';
import { TreeViewComponent } from './components';

@NgModule({
    declarations: [
        TreeViewComponent
    ],
    imports: [
        SharedModule,
        ScrollViewModule
    ],
    exports: [
        TreeViewComponent
    ]
})
export class TreeViewModule {}
