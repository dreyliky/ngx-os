import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    ViewChild
} from '@angular/core';
import { TreeNode, TreeViewComponent, ɵOsBaseViewComponent } from 'ngx-os';
import { Section } from '../../core';
import { SelectedSectionState } from '../../states';

// FIXME: Initialization of default section
@Component({
    selector: 'file-explorer-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent extends ɵOsBaseViewComponent implements AfterViewInit {
    @Input()
    public sections: TreeNode<Section>[];

    @ViewChild(TreeViewComponent)
    private readonly treeView: TreeViewComponent<Section>;

    constructor(
        private readonly selectedSectionState: SelectedSectionState,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public onTreeViewNodeSelected(section: TreeNode<Section>): void {
        this.selectedSectionState.set(section);
    }

    public ngAfterViewInit(): void {
        this.treeView.nodesSelection.select(this.selectedSectionState.data);
        this.changeDetector.detectChanges();
    }
}
