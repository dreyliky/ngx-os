import { TreeViewOverviewComponent } from '@Features/doc/demo';
import { ComponentEnum } from '@Features/doc/enums';
import { ComponentMetaInfo } from '@Features/doc/interfaces';
import { TreeViewComponent, TreeViewModule } from '@lib-modules';

export const TREE_VIEW_META_INFO: ComponentMetaInfo = {
    name: 'Tree View',
    type: ComponentEnum.TreeView,
    shortInfo: 'Tree view component short info',
    imageUrl: '/assets/icons/components/tree-view.png',
    libModules: [
        TreeViewModule
    ],
    libComponents: [
        TreeViewComponent
    ],
    libInterfaces: [
        'TreeNode'
    ],
    demoComponents: [
        {
            title: 'Tree view Overview',
            component: TreeViewOverviewComponent
        }
    ]
};
