import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeNode } from 'os-angular';

@Component({
    selector: 'app-demo-win10-window',
    templateUrl: './demo-win10-window.component.html',
    styleUrls: ['./demo-win10-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoWin10WindowComponent {
    public treeItems: TreeNode<any>[] = [
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
}
