import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeNode } from 'ngx-os';

@Component({
    selector: 'file-explorer-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
    public readonly sections: TreeNode[] = [
        {
            label: 'Desktop'
        },
        {
            label: 'Documents'
        },
        {
            label: 'Pictures'
        }
    ];
}
