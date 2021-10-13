import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeNode } from 'ngx-os';

@Component({
    selector: 'showcase-tree-view-overview',
    templateUrl: './tree-view-overview.component.html',
    styleUrls: ['./tree-view-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeViewOverviewComponent {
    public items: TreeNode<any>[] = [
        { label: 'Item 1' },
        {
            label: 'Item 2',
            children: [
                {
                    label: 'Child item 1',
                    children: [
                        { label: 'Another child element 1' },
                        { label: 'Another child element 2' }
                    ],
                    isExpanded: false
                },
                { label: 'Child item 2' }
            ]
        },
        {
            label: 'Item 3 (disabled)',
            isDisabled: true
        }
    ];
}
