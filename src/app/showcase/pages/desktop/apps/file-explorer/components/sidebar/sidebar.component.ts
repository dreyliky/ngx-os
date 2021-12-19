import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild
} from '@angular/core';
import { TreeNode, TreeNodeSelectionEvent, TreeViewComponent, ɵOsBaseViewComponent } from 'ngx-os';
import { Section } from '../../core';

@Component({
    selector: 'file-explorer-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent extends ɵOsBaseViewComponent {
    @Input()
    public sections: TreeNode<Section>[];

    @Input()
    public set selectedSection(section: TreeNode<Section>) {
        this.whenViewInit$
            .subscribe(() => {
                this.treeView.nodesSelection.select(section);
                this.changeDetector.detectChanges();
            });
    }

    @Output()
    public sectionSelected = new EventEmitter<TreeNode<Section>>();

    @ViewChild(TreeViewComponent)
    private readonly treeView: TreeViewComponent<Section>;

    constructor(
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public onTreeNodeSelected({ node }: TreeNodeSelectionEvent<Section>): void {
        this.sectionSelected.emit(node);
    }
}
