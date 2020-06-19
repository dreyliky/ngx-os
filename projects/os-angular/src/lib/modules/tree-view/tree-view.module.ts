import { NgModule } from '@angular/core';
import { TreeViewComponent } from './tree-view.component';
import { SharedModule } from '../../shared.module';

@NgModule({
    declarations: [TreeViewComponent],
    imports: [
        SharedModule
    ]
})
export class TreeViewModule {}