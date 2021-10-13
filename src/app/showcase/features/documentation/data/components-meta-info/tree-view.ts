import { TreeNodesExpansionService, TreeNodesSelectionService, TreeViewComponent, TreeViewModule } from 'ngx-os/modules';
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
    imageUrl: '/assets/showcase/icons/components/tree-view.png',
    libModules: [
        TreeViewModule
    ],
    libComponents: [
        TreeViewComponent
    ],
    libServices: [
        TreeNodesSelectionService,
        TreeNodesExpansionService
    ],
    libInterfaces: [
        'TreeNode',
        'TreeNodeClickEvent',
        'TreeNodeSelectionEvent',
        'TreeNodeExpansionEvent'
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
