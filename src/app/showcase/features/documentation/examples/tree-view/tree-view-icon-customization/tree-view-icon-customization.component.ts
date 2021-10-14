import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeNode } from 'ngx-os';

@Component({
    selector: 'showcase-tree-view-icon-customization',
    templateUrl: './tree-view-icon-customization.component.html',
    styleUrls: ['./tree-view-icon-customization.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeViewIconCustomizationComponent {
    public data: TreeNode[] = [
        { label: 'Item #1' },
        {
            label: 'Item #2',
            children: [
                { label: 'Child item #1' }
            ]
        }
    ];
}
