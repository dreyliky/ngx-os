import { NgModule } from '@angular/core';
import { ScrollViewModule } from '../scroll-view';
import { SharedModule } from '../shared.module';
import { TreeNodeComponent, TreeViewComponent } from './components';

@NgModule({
    declarations: [
        TreeViewComponent,
        TreeNodeComponent
    ],
    imports: [
        SharedModule,
        ScrollViewModule
    ],
    exports: [
        TreeViewComponent,
        TreeNodeComponent
    ]
})
export class TreeViewModule {}
