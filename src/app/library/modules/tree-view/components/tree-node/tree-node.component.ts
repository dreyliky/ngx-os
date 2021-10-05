import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    Output,
    TemplateRef
} from '@angular/core';
import { OsBaseComponent } from '../../../../core';
import { ITreeNode, ITreeNodeExpansionEvent, ITreeNodeSelectionEvent } from '../../interfaces';
import { TreeViewComponent } from '../tree-view';

@Component({
    selector: 'os-tree-node',
    templateUrl: './tree-node.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeNodeComponent<T> extends OsBaseComponent implements OnInit, OnChanges {
    @Input()
    public data: ITreeNode;

    @Input()
    public depth: number = 0;

    /** Fires when the node selected */
    @Output()
    public osSelected: EventEmitter<ITreeNodeSelectionEvent<T>> = new EventEmitter();

    /** Fires when the node deselected */
    @Output()
    public osDeselected: EventEmitter<ITreeNodeSelectionEvent<T>> = new EventEmitter();

    /** Fires when the node expanded */
    @Output()
    public osExpanded: EventEmitter<ITreeNodeExpansionEvent<T>> = new EventEmitter();

    /** Fires when the node collapsed */
    @Output()
    public osCollapsed: EventEmitter<ITreeNodeExpansionEvent<T>> = new EventEmitter();

    @HostBinding('attr.tabindex')
    public _hostTabIndexAttrValue: number = 0;

    @ContentChild('nodeTemplate')
    public readonly _nodeTemplate: TemplateRef<any>;

    constructor(
        private readonly treeView: TreeViewComponent<T>,
        private readonly hostRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnChanges(): void {
        this.applyClassList();
        this.applyStyleList();
    }

    public ngOnInit(): void {
        this.classListManager.add('os-tree-node');
        this.initElementEventObservers(this.hostRef.nativeElement);
    }

    public onClick(originalEvent: MouseEvent): void {
        super.onClick(originalEvent);
        this.data?.onClick?.({ originalEvent, node: this.data });

        if (!this.data || this.data?.isDisabled || !this.treeView.isAllowSelection) {
            return;
        }

        if (!this.treeView.isAllowMultipleSelection) {
            this.treeView.nodesSelection.deselectAllExceptSpecific(this.data);
        }

        if (this.treeView.isSelectionInToggleMode) {
            this.treeView.nodesSelection.toggle(this.data, originalEvent);
        } else {
            this.treeView.nodesSelection.select(this.data, originalEvent);
        }
    }

    public onToggleExpandButtonClick(originalEvent: MouseEvent, node: ITreeNode<T>): void {
        if (!node.isDisabled) {
            this.treeView.nodesExpansion.toggle(node, originalEvent);
        }

        originalEvent.stopPropagation();
    }

    private applyStyleList(): void {
        this.styleListManager.apply({
            '--os-tree-node-depth': this.depth
        });
    }

    private applyClassList(): void {
        this.classListManager.apply({
            'os-root-node': !this.depth,
            'os-disabled': this.data?.isDisabled,
            'os-expandable': this.data?.children?.length,
            'os-flat': !this.data?.children?.length,
            'os-expanded': this.data?.isExpanded,
            'os-selected': this.data?.isSelected
        });
    }
}
