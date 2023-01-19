/* eslint-disable @typescript-eslint/member-ordering */
import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    Optional,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseViewComponent } from '../../../../core';
import {
    TREE_VIEW_CHILDREN_HANDLER,
    TREE_VIEW_DISABLED_HANDLER
} from '../../constants';
import {
    TreeNodeClickEvent,
    TreeNodeExpansionEvent,
    TreeNodeSelectionEvent
} from '../../interfaces';
import { TreeNodesExpansionService, TreeNodesSelectionService } from '../../services';
import { ɵTreeNodesState } from '../../states';

/**
 * ## Content Projection Slots
 * - Attribute `os-tree-view-header`: Slot for your custom content above nodes
 * - Attribute `os-tree-view-content`: Slot for your custom content above nodes
 * (might be used instead of default behavior. For example you want to display your own nodes
 * somehow instead of auto-generated based on `data`)
 * - Attribute `os-tree-view-footer`: Slot for your custom content below nodes and custom content
 *
 * ```html
 * <os-tree-view>
 *     <div os-tree-view-header>YOUR HEADER CONTENT</div>
 *     <div os-tree-view-content>YOUR CONTENT</div>
 *     <!-- TREE NODES WILL BE RENDERED HERE -->
 *     <div os-tree-view-footer>YOUR FOOTER CONTENT</div>
 * </os-tree-view>
 * ```
 *
 * ## Templates
 * `#nodeContent`: Custom template for each node.
 *
 * Context:
 * - `$implicit`: {@link TreeNode} node data;
 * - `depth`: depth data (0 - root node; 1 and more - child node);
 *
 * ```html
 * <os-tree-view>
 *     <ng-template
 *        #nodeContent
 *        let-node
 *        let-depth="depth">
 *        <!-- Variable `node` contains the node data, and `depth` - the depth of the node. -->
 *        <!-- Now you are ready to build your custom content for each node. -->
 *      </ng-template>
 * </os-tree-view>
 * ```
 *
 * `#nodeIcon`: Custom template for the node expansion icon.
 *
 * Context:
 * - `$implicit`: {@link TreeNode} node data;
 * - `depth`: depth data (0 - root node; 1 and more - child node);
 *
 * ```html
 * <os-tree-view>
 *     <ng-template
 *        #nodeIcon
 *        let-node
 *        let-depth="depth">
 *        <!-- Variable `node` contains the node data, and `depth` - the depth of the node. -->
 *        <!-- Place your custom content for the node expansion icon here. -->
 *     </ng-template>
 * </os-tree-view>
 * ```
 **/
@Component({
    selector: 'os-tree-view',
    templateUrl: './tree-view.component.html',
    host: {
        'class': 'os-tree-view'
    },
    exportAs: 'osTreeView',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        ɵTreeNodesState,
        TreeNodesExpansionService,
        TreeNodesSelectionService
    ]
})
export class TreeViewComponent<T = any> extends ɵOsBaseViewComponent implements OnChanges {
    /** An array of tree nodes */
    @Input()
    public data: T[];

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
    public osNodeSelected: EventEmitter<TreeNodeSelectionEvent<T>> =
            this.nodesSelection._osSelected;

    /** Fires when the node deselected */
    @Output()
    public osNodeDeselected: EventEmitter<TreeNodeSelectionEvent<T>> =
            this.nodesSelection._osDeselected;

    /** Fires when the node expanded */
    @Output()
    public osNodeExpanded: EventEmitter<TreeNodeExpansionEvent<T>> =
            this.nodesExpansion._osExpanded;

    /** Fires when the node collapsed */
    @Output()
    public osNodeCollapsed: EventEmitter<TreeNodeExpansionEvent<T>> =
            this.nodesExpansion._osCollapsed;

    /** Fires when the node clicked by user */
    @Output()
    public osNodeClick: EventEmitter<TreeNodeClickEvent<T>> = new EventEmitter();

    /** @internal */
    @ContentChild('nodeIcon')
    public readonly _nodeIconTemplate: TemplateRef<any>;

    /** @internal */
    @ContentChild('nodeContent')
    public readonly _nodeContentTemplate: TemplateRef<any>;

    constructor(
        /** @internal */
        @Inject(TREE_VIEW_CHILDREN_HANDLER)
        public readonly childrenHandler: (item: T) => T[],
        /** @internal */
        @Inject(TREE_VIEW_DISABLED_HANDLER)
        @Optional()
        public readonly disabledHandler: (item: T) => boolean,
        /** The service for manipulating of nodes selection states */
        public readonly nodesSelection: TreeNodesSelectionService<T>,
        /** The service for manipulating of nodes expansion states */
        public readonly nodesExpansion: TreeNodesExpansionService<T>,
        private readonly nodesState: ɵTreeNodesState<T>
    ) {
        super();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.processDataAfterValueChanged(changes);
    }

    /** @internal */
    public onNodeClick(originalEvent: MouseEvent, node: T): void {
        this.osNodeClick.emit({ originalEvent, node });

        if (this.disabledHandler(node) || !this.isAllowSelection) {
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
    public onToggleExpandButtonClick(originalEvent: PointerEvent, node: T): void {
        if (!this.disabledHandler(node)) {
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
