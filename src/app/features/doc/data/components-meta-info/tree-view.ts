import { TreeViewOverviewComponent } from '@Features/doc/demo';
import { OsComponentEnum } from '@Features/doc/enums';
import { ComponentMetaInfo } from '@Features/doc/interfaces';
import { TreeViewComponent, TreeViewModule } from '@lib-modules';

export const TREE_VIEW_META_INFO: ComponentMetaInfo = {
    name: 'Tree View',
    type: OsComponentEnum.TreeView,
    shortInfo: 'Provides a tree that can be used to display hierarchy data.',
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
