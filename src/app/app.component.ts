import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { TreeNode, DynamicWindowService } from 'projects/os-angular/src/lib';
import { HelloWorldWindowComponent } from './features/test';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

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

    constructor (
        private readonly windowService: DynamicWindowService
    ) {}

    public ngOnInit (): void {
        this.windowService.open(HelloWorldWindowComponent, { data: 'There is custom data for window!' });
    }

}
