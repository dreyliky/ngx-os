import { ChangeDetectionStrategy, Component } from '@angular/core';

interface TreeNode {
    label: string;
    iconUrl: string;
    children?: TreeNode[];
}

@Component({
    selector: 'showcase-tree-view-with-custom-template',
    templateUrl: './tree-view-with-custom-template.component.html',
    styleUrls: ['./tree-view-with-custom-template.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeViewWithCustomTemplateComponent {
    public readonly nodeType!: TreeNode;
    public readonly nodes: TreeNode[] = [
        {
            label: 'My PC',
            iconUrl: '/assets/showcase/icons/my-pc.png',
            children: [
                {
                    label: 'Documents',
                    iconUrl: '/assets/showcase/icons/folder-opened.png'
                },
                {
                    label: 'Downloads',
                    iconUrl: '/assets/showcase/icons/folder-opened.png'
                },
                {
                    label: 'Images',
                    iconUrl: '/assets/showcase/icons/folder-opened.png'
                }
            ]
        }
    ];

    public readonly childrenHandler = (item: TreeNode): TreeNode[] => item.children;
}
