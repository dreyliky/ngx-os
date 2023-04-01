import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    HostBinding,
    HostListener,
    Inject,
    Input,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { debounceTime, filter, merge, takeUntil } from 'rxjs';
import { ɵCommonCssClassEnum, ɵOsBaseViewComponent } from '../../../../core';
import { ɵTREE_NODE } from '../../constants';
import { TreeNodeTriggerDirective } from '../../directives';
import { ɵTreeNodeCssClassEnum, ɵTreeNodeCssVariableEnum } from '../../enums';
import { ɵTreeNodesDepthState } from '../../states';
import { TreeViewComponent } from '../tree-view';

@Component({
    selector: 'os-tree-node',
    templateUrl: './tree-node.component.html',
    styleUrls: ['./tree-node.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'os-tree-node'
    }
})
export class TreeNodeComponent<T = any> extends ɵOsBaseViewComponent implements OnInit {
    /** Is disabled? */
    @Input()
    @HostBinding(`class.${ɵCommonCssClassEnum.Disabled}`)
    public isDisabled: boolean = false;

    /** Is expanded by default? */
    @Input()
    public set isExpandedByDefault(value: boolean) {
        if (value) {
            this._treeView.nodesExpansion.expand(this.data);
        }
    }

    /** Is selected by default? */
    @Input()
    public set isSelectedByDefault(value: boolean) {
        if (value) {
            this._treeView.nodesSelection.select(this.data);
        }
    }

    /** @internal */
    @HostBinding(`style.${ɵTreeNodeCssVariableEnum.Depth}`)
    public get _depth(): number {
        return this.nodesDepthState.get(this.data);
    }

    /** @internal */
    @HostBinding(`class.${ɵTreeNodeCssClassEnum.RootNode}`)
    public get _isRootNode(): boolean {
        return (this._depth === 0);
    }

    /** @internal */
    @HostBinding(`class.${ɵTreeNodeCssClassEnum.Expandable}`)
    public get _isExpandable(): boolean {
        return !!this._treeView.childrenHandler(this.data)?.length;
    }

    /** @internal */
    @HostBinding(`class.${ɵTreeNodeCssClassEnum.Expanded}`)
    public get _isExpanded(): boolean {
        return this._treeView.nodesExpansion.check(this.data);
    }

    /** @internal */
    @HostBinding(`class.${ɵCommonCssClassEnum.Selected}`)
    public get _isSelected(): boolean {
        return this._treeView.nodesSelection.check(this.data);
    }

    /** @internal */
    @HostBinding(`class.${ɵTreeNodeCssClassEnum.Flat}`)
    public get _isFlat(): boolean {
        return !this._treeView.childrenHandler(this.data)?.length;
    }

    /** @internal */
    @ContentChild(TreeNodeTriggerDirective)
    public readonly _nodeTrigger: TreeNodeTriggerDirective;

    constructor(
        /** @internal */
        public readonly _treeView: TreeViewComponent,
        /** Custom data of the TreeNode */
        @Inject(ɵTREE_NODE) public readonly data: T,
        private readonly nodesDepthState: ɵTreeNodesDepthState<T>,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initNodeEventsObserver();
    }

    /** @internal */
    @HostListener('click')
    public _onNodeClick(): void {
        if (this.isDisabled || !this._treeView.isAllowSelection) {
            return;
        }

        if (!this._treeView.isAllowMultipleSelection) {
            this._treeView.nodesSelection.deselectAllExceptSpecific(this.data);
        }

        if (this._treeView.isSelectionInToggleMode) {
            this._treeView.nodesSelection.toggle(this.data);
        } else {
            this._treeView.nodesSelection.select(this.data);
        }
    }

    private initNodeEventsObserver(): void {
        merge(
            this._treeView.osNodeSelected,
            this._treeView.osNodeDeselected,
            this._treeView.osNodeExpanded,
            this._treeView.osNodeCollapsed
        )
            .pipe(
                debounceTime(50),
                filter((node) => (node === this.data)),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe(() => this.changeDetector.markForCheck());
    }
}
