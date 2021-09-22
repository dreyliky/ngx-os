import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ITreeNode } from '@lib-modules';

@Component({
    selector: 'demo-tree-view-selection-setup',
    templateUrl: './tree-view-selection-setup.component.html',
    styleUrls: ['./tree-view-selection-setup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeViewSelectionSetupComponent {
    public isAllowSelection: boolean = true;
    public isAllowMultipleSelection: boolean = true;
    public isSelectionInToggleMode: boolean = true;

    public readonly data: ITreeNode[] = [
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
                    ]
                }
            ]
        },
        {
            label: 'Berries',
            isDisabled: true,
            children: [
                { label: 'Strawberry' }
            ]
        }
    ];
}
