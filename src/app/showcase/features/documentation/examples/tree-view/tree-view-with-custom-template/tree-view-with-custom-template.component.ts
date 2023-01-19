import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeNode, TREE_VIEW_CHILDREN_HANDLER } from 'ngx-os';

interface MyNodeData {
    iconUrl: string;
}

@Component({
    selector: 'showcase-tree-view-with-custom-template',
    templateUrl: './tree-view-with-custom-template.component.html',
    styleUrls: ['./tree-view-with-custom-template.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: TREE_VIEW_CHILDREN_HANDLER,
            useValue: (item: TreeNode) => item.children
        }
    ]
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
