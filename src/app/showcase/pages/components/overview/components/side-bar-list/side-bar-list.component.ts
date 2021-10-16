import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { ComponentMetaInfo, LibraryComponentsSearchService } from '@features/documentation';
import { TreeNode, TreeNodeSelectionEvent as Selection, TreeViewComponent } from 'ngx-os';
import { Observable } from 'rxjs';
import { OverviewService } from '../../overview.service';
import { SideBarItem } from './side-bar-item.interface';
import { SideBarItemsService } from './side-bar-items.service';

@Component({
    selector: 'showcase-side-bar-list',
    templateUrl: './side-bar-list.component.html',
    styleUrls: ['./side-bar-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        LibraryComponentsSearchService,
        SideBarItemsService
    ]
})
export class SideBarListComponent implements OnInit, AfterViewInit {
    @ViewChild(TreeViewComponent)
    private readonly treeView: TreeViewComponent<SideBarItem>;

    public metaInfo$: Observable<ComponentMetaInfo>;
    public nodes$: Observable<TreeNode<SideBarItem>[]>;

    constructor(
        private readonly componentsSearchService: LibraryComponentsSearchService,
        private readonly overviewService: OverviewService,
        private readonly itemsService: SideBarItemsService,
        private readonly router: Router,
        private readonly hostRef: ElementRef<HTMLElement>
    ) {}

    public ngOnInit(): void {
        this.metaInfo$ = this.overviewService.metaInfo$;
        this.nodes$ = this.itemsService.data$;
    }

    public ngAfterViewInit(): void {
        this.scrollToSelectedNode();
    }

    public onSearch(event: KeyboardEvent): void {
        const inputElement = event.target as HTMLInputElement;

        this.componentsSearchService.search(inputElement.value);
    }

    public onNodeSelected({ node }: Selection<SideBarItem>): void {
        this.router.navigateByUrl(node.data.sectionUrl);

        if (node.children?.length) {
            this.treeView.nodesExpansion.collapseAll();
        }

        this.treeView.nodesExpansion.expand(node);
    }

    private scrollToSelectedNode(): void {
        const selectedNodes = this.treeView.nodesSelection.getAllSelected();
        const selectedNode = selectedNodes[0];

        if (selectedNode) {
            const nodeElement = this.hostRef.nativeElement
                .querySelector(`#${selectedNode.id}`) as HTMLElement;

            this.treeView.scrollView.scrollTo(0, nodeElement.offsetTop);
        }
    }
}
