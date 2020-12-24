import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TreeNode } from 'os-angular';

@Component({
    selector: 'demo-tree-view-overview',
    templateUrl: './tree-view-overview.component.html',
    styleUrls: ['./tree-view-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeViewOverviewComponent implements OnInit {

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
                    ]
                },
                { label: 'Child item 2' }
            ]
        },
        { label: 'Item 3' }
    ];

    constructor() {}

    public ngOnInit(): void {}

}
