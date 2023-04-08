import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { LibraryComponentsSearchService } from '@features/documentation';
import {
    TreeViewComponent,
    ɵOsBaseViewComponent
} from 'ngx-os';
import { takeUntil } from 'rxjs';
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
export class SideBarListComponent extends ɵOsBaseViewComponent implements AfterViewInit {
    public readonly nodeType!: SideBarItem;

    public nodes: SideBarItem[];

    @ViewChild(TreeViewComponent)
    private readonly treeView: TreeViewComponent<SideBarItem>;

    @ViewChild(TreeViewComponent, { read: ElementRef })
    private readonly treeViewElementRef: ElementRef<HTMLElement>;

    constructor(
        private readonly componentsSearchService: LibraryComponentsSearchService,
        private readonly itemsService: SideBarItemsService,
        private readonly router: Router,
        private readonly hostRef: ElementRef<HTMLElement>,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public readonly childrenHandler = (node: SideBarItem): SideBarItem[] => (node.children ?? []);

    public ngAfterViewInit(): void {
        this.initNodesObserver();
    }

    public onSearch(event: KeyboardEvent): void {
        const inputElement = event.target as HTMLInputElement;

        this.componentsSearchService.search(inputElement.value);
    }

    public onNodeSelected(node: SideBarItem): void {
        this.router.navigateByUrl(node.sectionUrl);

        if (node.children?.length) {
            this.treeView.nodesExpansion.collapseAll();
        }

        this.treeView.nodesExpansion.expand(node);
    }

    private initNodesObserver(): void {
        this.itemsService.data$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((nodes) => {
                this.nodes = nodes;

                this.changeDetector.detectChanges();
                this.scrollToSelectedNode();
            });
    }

    private scrollToSelectedNode(): void {
        const selectedNodes = this.treeView.nodesSelection.getAllSelected();
        const selectedNode = selectedNodes[0];

        if (selectedNode) {
            const nodeElement = this.hostRef.nativeElement
                .querySelector<HTMLElement>(`#${selectedNode.id}`);

            this.treeViewElementRef.nativeElement.scrollTop = nodeElement.offsetTop;
        }
    }
}
