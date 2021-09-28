import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef
} from '@angular/core';
import { OsBaseComponent } from '@lib-core';
import { ITreeNode, ITreeNodeClickEvent, ITreeNodeExpansionEvent, ITreeNodeSelectionEvent } from '../../interfaces';
import { TreeNodesExpansionService, TreeNodesSelectionService } from '../../services';

@Component({
    selector: 'os-tree-view',
    templateUrl: './tree-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        TreeNodesExpansionService,
        TreeNodesSelectionService
    ]
})
export class TreeViewComponent<T> extends OsBaseComponent implements OnInit {
    /** An array of tree nodes */
    @Input()
    public data: ITreeNode<T>[];

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
    public isAllNodesExpandedByDefault: boolean = false;

    /** Can the user expand multiple nodes at the same time? */
    @Input()
    public isAllowMultipleExpansion: boolean = true;

    /** Fires when the node selected */
    @Output()
    public get osNodeSelected(): EventEmitter<ITreeNodeSelectionEvent<T>> {
        return this.nodesSelection._osSelected;
    }

    /** Fires when the node deselected */
    @Output()
    public get osNodeDeselected(): EventEmitter<ITreeNodeSelectionEvent<T>> {
        return this.nodesSelection._osDeselected;
    }

    /** Fires when the node expanded */
    @Output()
    public get osNodeExpanded(): EventEmitter<ITreeNodeExpansionEvent<T>> {
        return this.nodesExpansion._osExpanded;
    }

    /** Fires when the node collapsed */
    @Output()
    public get osNodeCollapsed(): EventEmitter<ITreeNodeExpansionEvent<T>> {
        return this.nodesExpansion._osCollapsed;
    }

    /** Fires when the node clicked by user */
    @Output()
    public osNodeClick: EventEmitter<ITreeNodeClickEvent<T>> = new EventEmitter();

    @ContentChild('nodeTemplate')
    public readonly _nodeTemplate: TemplateRef<any>;

    constructor(
        /** The service for manipulating of nodes selection states */
        public readonly nodesSelection: TreeNodesSelectionService<T>,
        /** The service for manipulating of nodes expansion states */
        public readonly nodesExpansion: TreeNodesExpansionService<T>,
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classListManager.add('os-tree-view');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
        this.nodesSelection._init(this);
        this.nodesExpansion._init(this);
    }

    public onNodeClick(originalEvent: MouseEvent, node: ITreeNode<T>): void {
        this.osNodeClick.emit({ originalEvent, node });

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

    public onToggleExpandButtonClick(originalEvent: MouseEvent, node: ITreeNode<T>): void {
        if (!node.isDisabled) {
            this.nodesExpansion.toggle(node, originalEvent);
        }

        originalEvent.stopPropagation();
    }
}
