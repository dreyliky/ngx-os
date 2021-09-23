import { TreeViewComponent, TreeViewModule } from '@lib-modules';
import { OsComponentEnum } from '../../enums';
import {
    TreeViewOverviewComponent,
    TreeViewSelectionSetupComponent,
    TreeViewWithCustomTemplateComponent
} from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

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
        'ITreeNode',
        'ITreeNodeSelectionEvent'
    ],
    demoComponents: [
        {
            title: 'Tree View Overview',
            component: TreeViewOverviewComponent
        },
        {
            title: 'Tree View selection setup',
            component: TreeViewSelectionSetupComponent
        },
        {
            title: 'Tree View with custom template',
            component: TreeViewWithCustomTemplateComponent
        }
    ]
};
