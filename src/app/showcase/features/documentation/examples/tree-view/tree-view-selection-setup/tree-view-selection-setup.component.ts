import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from 'ngx-os';

interface Item {
    label: string;
    isDisabled?: boolean;
    isExpandedByDefault?: boolean;
    isSelectedByDefault?: boolean;
    children?: Item[];
}

@Component({
    selector: 'showcase-tree-view-selection-setup',
    templateUrl: './tree-view-selection-setup.component.html',
    styleUrls: ['./tree-view-selection-setup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeViewSelectionSetupComponent {
    public isAllowSelection: boolean = true;
    public isAllowMultipleSelection: boolean = true;
    public isSelectionInToggleMode: boolean = true;

    public readonly nodeType!: Item;
    public readonly nodes: Item[] = [
        {
            label: 'Fruits',
            children: [
                {
                    label: 'Apple',
                    children: [
                        { label: 'Fuji' },
                        { label: 'Macintosh' }
                    ]
                },
                { label: 'Orange' },
                { label: 'Banana' }
            ]
        },
        {
            label: 'Vegetables',
            children: [
                { label: 'Tomato' },
                { label: 'Potato' },
                {
                    label: 'Onion',
                    children: [
                        { label: 'Yellow' },
                        { label: 'White' },
                        { label: 'Purple' }
                    ],
                    isDisabled: true
                }
            ],
            isSelectedByDefault: true,
            isExpandedByDefault: true
        },
        {
            label: 'Berries',
            children: [
                { label: 'Strawberry', isDisabled: true }
            ],
            isExpandedByDefault: true,
            isDisabled: true
        }
    ];

    @ViewChild(TreeViewComponent, { static: true })
    private readonly treeView: TreeViewComponent<Item>;

    public get selectedNodesAsString(): string {
        return this._selectedNodes
            .map((node) => node.label)
            .join(', ');
    }

    private _selectedNodes: Item[] = [];

    public childrenHandler = (item: Item): Item[] => item.children;

    public onNodeToggleSelection(): void {
        this._selectedNodes = this.treeView.nodesSelection.getAllSelected();
    }
}
