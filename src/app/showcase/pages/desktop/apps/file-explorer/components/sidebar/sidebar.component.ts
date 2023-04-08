import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component, ViewChild
} from '@angular/core';
import {
    TreeViewComponent,
    ɵOsBaseViewComponent
} from 'ngx-os';
import { Section, SECTIONS } from '../../core';
import { SelectedSectionState } from '../../states';

// FIXME: Initialization of default section
@Component({
    selector: 'file-explorer-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent extends ɵOsBaseViewComponent implements AfterViewInit {
    public sections = SECTIONS;

    public readonly sectionType!: Section;

    @ViewChild(TreeViewComponent)
    private readonly treeView: TreeViewComponent<Section>;

    constructor(
        private readonly selectedSectionState: SelectedSectionState
    ) {
        super();
    }

    public onTreeViewNodeSelected(section: Section): void {
        this.selectedSectionState.set(section);
    }

    public ngAfterViewInit(): void {
        this.treeView.nodesSelection.select(this.selectedSectionState.data);
    }
}
