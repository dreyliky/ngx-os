import {
    Directive,
    HostBinding,
    HostListener,
    Inject
} from '@angular/core';
import { ɵDestroyService } from '../../../core';
import type { TreeNodeComponent, TreeViewComponent } from '../components';
import { ɵTREE_NODE_COMPONENT, ɵTREE_VIEW_COMPONENT } from '../constants';

/** Marks element as the expander (action trigger) of the TreeNode. */
@Directive({
    selector: '[osTreeNodeTrigger]',
    host: {
        class: 'os-tree-node-trigger'
    },
    providers: [
        ɵDestroyService
    ]
})
export class TreeNodeTriggerDirective {
    /** @internal */
    @HostBinding('style.visibility')
    public get _visibilityStyle(): string {
        const childrenNodes = this.treeView.childrenHandler(this.treeNode.data);

        return (childrenNodes?.length) ? '' : 'hidden';
    }

    constructor(
        @Inject(ɵTREE_VIEW_COMPONENT)
        private readonly treeView: TreeViewComponent,
        @Inject(ɵTREE_NODE_COMPONENT)
        private readonly treeNode: TreeNodeComponent
    ) {}

    /** @internal */
    @HostListener('click', ['$event'])
    public _onClick(originalEvent: PointerEvent): void {
        const node = this.treeNode.data;

        if (!this.treeNode.isDisabled) {
            this.treeView.nodesExpansion.toggle(node);
        }

        originalEvent.stopPropagation();
    }
}
