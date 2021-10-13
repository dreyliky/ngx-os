import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeNode } from 'ngx-os';

interface MyNodeData {
    iconUrl: string;
}

@Component({
    selector: 'showcase-tree-view-with-custom-template',
    templateUrl: './tree-view-with-custom-template.component.html',
    styleUrls: ['./tree-view-with-custom-template.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeViewWithCustomTemplateComponent {
    public readonly nodes: TreeNode<MyNodeData>[] = [
        {
            label: 'My PC',
            data: { iconUrl: '/assets/showcase/icons/my-pc.png' },
            children: [
                {
                    label: 'Documents',
                    data: { iconUrl: '/assets/showcase/icons/folder-opened.png' }
                },
                {
                    label: 'Downloads',
                    data: { iconUrl: '/assets/showcase/icons/folder-opened.png' }
                },
                {
                    label: 'Images',
                    data: { iconUrl: '/assets/showcase/icons/folder-opened.png' }
                }
            ]
        }
    ];
}
