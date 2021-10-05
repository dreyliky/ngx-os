import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ITreeNode, ITreeNodeSelectionEvent } from 'ngx-os/modules';

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

    public readonly nodes: ITreeNode[] = [
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
            isSelected: true,
            isExpanded: true
        },
        {
            label: 'Berries',
            children: [
                { label: 'Strawberry', isDisabled: true }
            ],
            isExpanded: true,
            isDisabled: true
        }
    ];

    public get selectedNodesAsString(): string {
        return this._selectedNodes
            .map((node) => node.label)
            .join(', ');
    }

    private _selectedNodes: ITreeNode[] = [];

    public onNodeToggleSelection({ allSelected }: ITreeNodeSelectionEvent): void {
        this._selectedNodes = allSelected;
    }
}
