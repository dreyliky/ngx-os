import {
    Directive,
    HostBinding,
    HostListener
} from '@angular/core';
import { ɵDestroyService } from '../../../core';
import { TreeNodeComponent, TreeViewComponent } from '../components';

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
        private readonly treeView: TreeViewComponent,
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
