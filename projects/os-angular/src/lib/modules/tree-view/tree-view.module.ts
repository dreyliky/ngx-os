import { NgModule } from '@angular/core';
import { SharedModule } from 'os-angular/shared.module';
import { TreeViewComponent } from './tree-view.component';

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
