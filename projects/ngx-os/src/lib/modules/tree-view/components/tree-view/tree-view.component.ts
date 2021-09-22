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
import { ITreeNode } from '../../interfaces';

@Component({
    selector: 'os-tree-view',
    templateUrl: './tree-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
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

    @Output()
    public osNodeSelected: EventEmitter<ITreeNode<T>> = new EventEmitter();

    @Output()
    public osNodeDeselected: EventEmitter<ITreeNode<T>> = new EventEmitter();

    @ContentChild('nodeTemplate')
    public nodeTemplate: TemplateRef<any>;

    private nodesExpandableStateMap: Map<ITreeNode<T>, boolean> = new Map();
    private nodesSelectedStateMap: Map<ITreeNode<T>, boolean> = new Map();

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-tree-view');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }

    public onNodeClick(node: ITreeNode<T>): void {
        if (node.isDisabled || !this.isAllowSelection) {
            return;
        }

        if (!this.isAllowMultipleSelection) {
            this.deselectAllNodesExceptSpecific(node);
        }

        if (this.isSelectionInToggleMode) {
            this.toggleNodeSelection(node);
        } else {
            this.selectNode(node);
        }
    }

    public onToggleExpandButtonClick(event: MouseEvent, node: ITreeNode<T>): void {
        if (!node.isDisabled && node.children?.length) {
            const isNodeExpanded = this.nodesExpandableStateMap.get(node);

            this.nodesExpandableStateMap.set(node, !isNodeExpanded);
        }

        event.stopPropagation();
    }

    public isNodeSelected(node: ITreeNode<T>): boolean {
        return this.nodesSelectedStateMap.get(node);
    }

    public isNodeExpanded(node: ITreeNode<T>): boolean {
        return this.nodesExpandableStateMap.get(node);
    }

    public toggleNodeSelection(node: ITreeNode<T>): void {
        const isNodeSelected = this.nodesSelectedStateMap.get(node);

        this.nodesSelectedStateMap.set(node, !isNodeSelected);
        this.osNodeSelected.emit(node);
    }

    public selectNode(node: ITreeNode<T>): void {
        this.nodesSelectedStateMap.set(node, true);
        this.osNodeSelected.emit(node);
    }

    public deselectNode(node: ITreeNode<T>): void {
        this.nodesSelectedStateMap.set(node, false);
        this.osNodeDeselected.emit(node);
    }

    private deselectAllNodesExceptSpecific(node: ITreeNode<T>): void {
        this.nodesSelectedStateMap.forEach((state, currNode) => {
            if (state && currNode !== node) {
                this.deselectNode(currNode);
            }
        });
    }
}
