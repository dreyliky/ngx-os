import { NgModule } from '@angular/core';
import { SharedModule } from '@lib-shared';
import { TreeViewComponent } from './components';

@NgModule({
    declarations: [
        TreeViewComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        TreeViewComponent
    ]
})
export class TreeViewModule {}
