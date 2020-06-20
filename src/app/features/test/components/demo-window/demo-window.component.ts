import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'projects/os-angular/src/lib';

@Component({
    selector: 'app-demo-window',
    templateUrl: './demo-window.component.html',
    styleUrls: ['./demo-window.component.scss']
})
export class DemoWindowComponent implements OnInit {

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

    constructor () {}

    public ngOnInit (): void {}

}
