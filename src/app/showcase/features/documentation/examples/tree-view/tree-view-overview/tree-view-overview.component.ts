import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from 'ngx-os';

interface Item {
    name: string;
    nestedItems?: Item[];
    isDisabled?: boolean;
}

@Component({
    selector: 'showcase-tree-view-overview',
    templateUrl: './tree-view-overview.component.html',
    styleUrls: ['./tree-view-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeViewOverviewComponent implements AfterViewInit {
    public readonly itemType!: Item;
    public readonly items: Item[] = [
        { name: 'Item 1' },
        {
            name: 'Item 2',
            nestedItems: [
                {
                    name: 'Child item 1',
                    nestedItems: [
                        { name: 'Another child element 1' },
                        { name: 'Another child element 2' }
                    ]
                },
                { name: 'Child item 2' }
            ]
        },
        {
            name: 'Item 3 (disabled)',
            isDisabled: true
        }
    ];

    @ViewChild(TreeViewComponent)
    private readonly treeView: TreeViewComponent<Item>;

    public readonly childrenHandler = (node: Item): Item[] => node.nestedItems;

    public ngAfterViewInit(): void {
        this.treeView.nodesExpansion.expandAll();
    }
}
