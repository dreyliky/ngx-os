import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { OsBaseComponent } from '../../core';
import { TreeNode } from './interfaces';

@Component({
    selector: 'os-tree-view',
    templateUrl: './tree-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeViewComponent extends OsBaseComponent implements OnInit {

    @Input()
    public data: TreeNode[];

    constructor () {
        super({
            elementName: 'os-tree-view'
        });
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

}
