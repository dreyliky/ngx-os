/* eslint-disable @typescript-eslint/member-ordering */
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    Injector,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseViewComponent } from '../../../../core';
import { TreeViewNodeDirective } from '../../directives/node.directive';
import { ɵNodeTemplateContext } from '../../interfaces';
import {
    TreeNodesExpansionService,
    TreeNodesSelectionService,
    ɵTreeNodesProcessorService
} from '../../services';
import {
    ɵTreeNodesDepthState,
    ɵTreeNodesState
} from '../../states';

/**
 * ## Content Projection Slots
 * - Directive `osTreeViewHeader`: Slot for your custom content above nodes
 * - Directive `osTreeViewFooter`: Slot for your custom content below nodes and custom content
 *
 * ```html
 * <os-tree-view>
 *     <div osTreeViewHeader>YOUR HEADER CONTENT</div>
 *     <!-- TREE NODES WILL BE RENDERED HERE -->
 *     <div osTreeViewFooter>YOUR FOOTER CONTENT</div>
 * </os-tree-view>
 * ```
 *
 * ## Templates
 * `osTreeViewNode`: Custom template for each node.
 *
 * Context:
 * - `$implicit`: {@type T} node data;
 * - `depth`: depth of the node (0 - root node; 1 and more - child node);
 * - `index`: index of the node;
 *
 * ```html
 * <os-tree-view>
 *     <ng-template
 *        osTreeViewNode
 *        let-node
 *        let-nodeDepth="depth"
 *        let-nodeIndex="index">
 *        <!--
 *          `node` contains the node data;
 *          `nodeDepth` contains depth of the node;
 *          `nodeIndex` contains index of the node;
 *          Now you are ready to build your custom content for each node.
 *        -->
 *      </ng-template>
 * </os-tree-view>
 * ```
 **/
@Component({
    selector: 'os-tree-view',
    templateUrl: './tree-view.component.html',
    host: {
        'class': 'os-tree-view os-scroll-view'
    },
    exportAs: 'osTreeView',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        ɵTreeNodesState,
        ɵTreeNodesDepthState,
        TreeNodesExpansionService,
        TreeNodesSelectionService,
        ɵTreeNodesProcessorService
    ]
})
export class TreeViewComponent<T = any> extends ɵOsBaseViewComponent
    implements OnChanges, AfterContentInit {
    /** An array of tree nodes */
    @Input()
    public data: T[];

    /** A handler for getting children of the node */
    @Input()
    public childrenHandler: (node: T) => T[] = () => [];

    /** Can the user select tree nodes? */
    @Input()
    public isAllowSelection: boolean = false;

    /** Can the user select multiple tree nodes? */
    @Input()
    public isAllowMultipleSelection: boolean = false;

    /** Can the user select and deselect the same tree node? */
    @Input()
    public isSelectionInToggleMode: boolean = false;

    /** Can the user expand multiple nodes at the same time? */
    @Input()
    public isAllowMultipleExpansion: boolean = true;

    /** Fires when the node selected */
    @Output()
    public osNodeSelected: EventEmitter<T> = this.nodesSelection._osSelected;

    /** Fires when the node deselected */
    @Output()
    public osNodeDeselected: EventEmitter<T> = this.nodesSelection._osDeselected;

    /** Fires when the node expanded */
    @Output()
    public osNodeExpanded: EventEmitter<T> = this.nodesExpansion._osExpanded;

    /** Fires when the node collapsed */
    @Output()
    public osNodeCollapsed: EventEmitter<T> = this.nodesExpansion._osCollapsed;

    /** @internal */
    @ContentChild(TreeViewNodeDirective, { read: TemplateRef })
    public readonly _nodeTemplate: TemplateRef<ɵNodeTemplateContext<T>>;

    constructor(
        /** The service for manipulating of nodes selection states */
        public readonly nodesSelection: TreeNodesSelectionService<T>,
        /** The service for manipulating of nodes expansion states */
        public readonly nodesExpansion: TreeNodesExpansionService<T>,
        private readonly nodesProcessor: ɵTreeNodesProcessorService<T>,
        /** @internal */
        public readonly _injector: Injector
    ) {
        super();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.data?.currentValue !== changes.data?.previousValue) {
            this.nodesProcessor.register(this.data, this.childrenHandler);
        }
    }

    public ngAfterContentInit(): void {
        this.throwErrorIfNodeTemplateAbsent();
    }

    private throwErrorIfNodeTemplateAbsent(): void {
        if (!this._nodeTemplate) {
            throw new Error('The `osTreeViewNode` ng-template is required!');
        }
    }
}
