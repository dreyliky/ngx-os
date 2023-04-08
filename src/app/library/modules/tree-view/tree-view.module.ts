import { NgModule } from '@angular/core';
import { ScrollViewModule } from '../scroll-view';
import { ɵSharedModule } from '../shared.module';
import {
    TreeNodeComponent,
    TreeViewComponent
} from './components';
import {
    TreeNodeTriggerDirective,
    TreeViewFooterDirective,
    TreeViewHeaderDirective,
    TreeViewNodeDirective,
    ɵTreeNodeOutletDirective
} from './directives';

@NgModule({
    declarations: [
        TreeViewComponent,
        TreeNodeComponent,
        TreeViewFooterDirective,
        TreeViewHeaderDirective,
        TreeViewNodeDirective,
        TreeNodeTriggerDirective,
        ɵTreeNodeOutletDirective
    ],
    imports: [
        ɵSharedModule,
        ScrollViewModule
    ],
    exports: [
        TreeViewComponent,
        TreeNodeComponent,
        TreeViewFooterDirective,
        TreeViewHeaderDirective,
        TreeViewNodeDirective,
        TreeNodeTriggerDirective
    ]
})
export class TreeViewModule {}
