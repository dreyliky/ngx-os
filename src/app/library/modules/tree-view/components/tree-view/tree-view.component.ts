import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { OsBaseComponent } from '../../../../core';
import { ScrollViewComponent } from '../../../scroll-view';
import { TreeNode, TreeNodeClickEvent, TreeNodeExpansionEvent, TreeNodeSelectionEvent } from '../../interfaces';
import { TreeNodesExpansionService, TreeNodesSelectionService } from '../../services';
import { TreeNodesState } from '../../states';

/**
 * ## Content Projection Slots
 * - Attribute `os-tree-view-header`: Slot for your custom content above nodes
 * - Attribute `os-tree-view-content`: Slot for your custom content above nodes
 * (might be used instead of default behavior. For example you want to display your own nodes
 * somehow instead of auto-generated based on `data`)
 * - Attribute `os-tree-view-footer`: Slot for your custom content below nodes and custom content
 *
 * ## Templates
 * `#nodeContent`: Custom template for each node.
 *
 * Context:
 * - `$implicit`: {@link TreeNode} node data;
 * - `depth`: depth data (0 - root node; 1 and more - child node);
 *
 * @example
 * ```html
 * <ng-template
 *    #nodeContent
 *    let-node
 *    let-depth="depth">
 *    <!--
 *        Variable `node` contains the node data, and `depth` - the depth of the node.
 *        Now you are ready to build your custom content for each node.
 *    -->
 * </ng-template>
 * ```
 *
 * `#nodeIcon`: Custom template for the node expansion icon.
 *
 * Context:
 * - `$implicit`: {@link TreeNode} node data;
 * - `depth`: depth data (0 - root node; 1 and more - child node);
 *
 * ```html
 * <ng-template
 *    #nodeIcon
 *    let-node
 *    let-depth="depth">
 *    <!--
 *        Variable `node` contains the node data, and `depth` - the depth of the node.
 *        Place your custom content for the node expansion icon here.
 *    -->
 * </ng-template>
 * ```
 **/
@Component({
    selector: 'os-tree-view',
    templateUrl: './tree-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        TreeNodesState,
        TreeNodesExpansionService,
        TreeNodesSelectionService
    ]
})
export class TreeViewComponent<T> extends OsBaseComponent implements OnInit, OnChanges {
    /** An array of tree nodes */
    @Input()
    public data: TreeNode<T>[];

    /** Can the user select tree nodes? */
    @Input()
    public isAllowSelection: boolean = false;

    /** Can the user select multiple tree nodes? */
    @Input()
    public isAllowMultipleSelection: boolean = false;

    /** Can the user select and deselect the same tree node? */
    @Input()
    public isSelectionInToggleMode: boolean = false;

    /** Should all nodes be expanded when the component is first rendered? */
    @Input()
    public isAllNodesExpanded: boolean = false;

    /** Can the user expand multiple nodes at the same time? */
    @Input()
    public isAllowMultipleExpansion: boolean = true;

    /** Stylelist for scroll view component of the tree-view */
    @Input()
    public scrollViewStyle: object;

    /** Classlist for scroll view component of the tree-view */
    @Input()
    public scrollViewStyleClass: string | string[] | object;

    /** Fires when the node selected */
    @Output()
    public get osNodeSelected(): EventEmitter<TreeNodeSelectionEvent<T>> {
        return this.nodesSelection._osSelected;
    }

    /** Fires when the node deselected */
    @Output()
    public get osNodeDeselected(): EventEmitter<TreeNodeSelectionEvent<T>> {
        return this.nodesSelection._osDeselected;
    }

    /** Fires when the node expanded */
    @Output()
    public get osNodeExpanded(): EventEmitter<TreeNodeExpansionEvent<T>> {
        return this.nodesExpansion._osExpanded;
    }

    /** Fires when the node collapsed */
    @Output()
    public get osNodeCollapsed(): EventEmitter<TreeNodeExpansionEvent<T>> {
        return this.nodesExpansion._osCollapsed;
    }

    /** Fires when the node clicked by user */
    @Output()
    public osNodeClick: EventEmitter<TreeNodeClickEvent<T>> = new EventEmitter();

    /** ScrollView component for scroll manipulations */
    @ViewChild(ScrollViewComponent)
    public readonly scrollView: ScrollViewComponent;

    /** @internal */
    @ContentChild('nodeIcon')
    public readonly _nodeIconTemplate: TemplateRef<any>;

    /** @internal */
    @ContentChild('nodeContent')
    public readonly _nodeContentTemplate: TemplateRef<any>;

    constructor(
        /** The service for manipulating of nodes selection states */
        public readonly nodesSelection: TreeNodesSelectionService<T>,
        /** The service for manipulating of nodes expansion states */
        public readonly nodesExpansion: TreeNodesExpansionService<T>,
        private readonly nodesState: TreeNodesState<T>,
        private readonly hostRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.processDataAfterValueChanged(changes);
    }

    public ngOnInit(): void {
        this.classListManager.add('os-tree-view');
        this.initElementEventObservers(this.hostRef.nativeElement);
    }

    /** @internal */
    public onNodeClick(originalEvent: MouseEvent, node: TreeNode<T>): void {
        this.osNodeClick.emit({ originalEvent, node });
        node.onClick?.({ originalEvent, node });

        if (node.isDisabled || !this.isAllowSelection) {
            return;
        }

        if (!this.isAllowMultipleSelection) {
            this.nodesSelection.deselectAllExceptSpecific(node);
        }

        if (this.isSelectionInToggleMode) {
            this.nodesSelection.toggle(node, originalEvent);
        } else {
            this.nodesSelection.select(node, originalEvent);
        }
    }

    /** @internal */
    public onToggleExpandButtonClick(originalEvent: MouseEvent, node: TreeNode<T>): void {
        if (!node.isDisabled) {
            this.nodesExpansion.toggle(node, originalEvent);
        }

        originalEvent.stopPropagation();
    }

    private processDataAfterValueChanged(changes: SimpleChanges): void {
        if (changes.data?.previousValue !== changes.data?.currentValue) {
            this.nodesState.set(changes.data.currentValue);
            this.nodesSelection._initDefaultStateForAll();
            this.nodesExpansion._initDefaultStateForAll(this.isAllNodesExpanded);
        }
    }
}
