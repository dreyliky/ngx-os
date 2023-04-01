import { OsComponentEnum } from '../../enums';
import {
    TreeViewIconCustomizationComponent,
    TreeViewOverviewComponent,
    TreeViewSelectionSetupComponent,
    TreeViewWithCustomTemplateComponent
} from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const TREE_VIEW_META_INFO: ComponentMetaInfo = {
    name: 'Tree View',
    type: OsComponentEnum.TreeView,
    shortInfo: 'Provides a view that can be used to display hierarchy data.',
    imageUrl: '/assets/showcase/icons/components/tree-view.png',
    libModules: [
        'TreeViewModule'
    ],
    libComponents: [
        'TreeViewComponent',
        'TreeNodeComponent'
    ],
    libDirectives: [
        'TreeViewHeaderDirective',
        'TreeViewFooterDirective',
        'TreeNodeTriggerDirective',
        'TreeViewNodeDirective'
    ],
    libServices: [
        'TreeNodesSelectionService',
        'TreeNodesExpansionService'
    ],
    demoComponents: [
        {
            title: 'Tree View Overview',
            componentName: 'TreeViewOverviewComponent',
            component: TreeViewOverviewComponent
        },
        {
            title: 'Tree View selection setup',
            componentName: 'TreeViewSelectionSetupComponent',
            component: TreeViewSelectionSetupComponent
        },
        {
            title: 'Tree View custom icon template',
            componentName: 'TreeViewIconCustomizationComponent',
            component: TreeViewIconCustomizationComponent
        },
        {
            title: 'Tree View with custom template',
            componentName: 'TreeViewWithCustomTemplateComponent',
            component: TreeViewWithCustomTemplateComponent
        }
    ]
};
