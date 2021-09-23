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
import { ITreeNode, ITreeNodeClickEvent, ITreeNodeSelectionEvent } from '../../interfaces';
import { NodesExpansionService, NodesSelectionService } from '../../services';

@Component({
    selector: 'os-tree-view',
    templateUrl: './tree-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        NodesExpansionService,
        NodesSelectionService
    ]
})
export class TreeViewComponent<T> extends OsBaseComponent implements OnInit {
    @Input()
    public data: ITreeNode<T>[];

    @Input()
    public isAllowSelection: boolean = false;

    @Input()
    public isAllowMultipleSelection: boolean = false;

    @Input()
    public isSelectionInToggleMode: boolean = false;

    @Input()
    public isAllNodesExpandedByDefault: boolean = false;

    @Input()
    public isAllowMultipleExpansion: boolean = true;

    @Output()
    public get osNodeSelected(): EventEmitter<ITreeNodeSelectionEvent<T>> {
        return this.nodesSelection.osSelected;
    }

    @Output()
    public get osNodeDeselected(): EventEmitter<ITreeNodeSelectionEvent<T>> {
        return this.nodesSelection.osDeselected;
    }

    @Output()
    public get osNodeExpanded(): EventEmitter<ITreeNode<T>> {
        return this.nodesExpansion.osExpanded;
    }

    @Output()
    public get osNodeCollapsed(): EventEmitter<ITreeNode<T>> {
        return this.nodesExpansion.osCollapsed;
    }

    @Output()
    public osNodeClick: EventEmitter<ITreeNodeClickEvent<T>> = new EventEmitter();

    @ContentChild('nodeTemplate')
    public nodeTemplate: TemplateRef<any>;

    constructor(
        public readonly nodesSelection: NodesSelectionService<T>,
        public readonly nodesExpansion: NodesExpansionService<T>,
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-tree-view');
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
            this.nodesSelection.toggle(node);
        } else {
            this.nodesSelection.select(node);
        }
    }

    public onToggleExpandButtonClick(event: MouseEvent, node: ITreeNode<T>): void {
        if (!node.isDisabled) {
            this.nodesExpansion.toggle(node);
        }

        event.stopPropagation();
    }
}
