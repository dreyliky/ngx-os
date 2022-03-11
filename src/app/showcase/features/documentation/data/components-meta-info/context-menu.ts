import { OsComponentEnum } from '../../enums';
import { ContextMenuOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const CONTEXT_MENU_META_INFO: ComponentMetaInfo = {
    name: 'Context Menu',
    type: OsComponentEnum.ContextMenu,
    shortInfo: 'Provides OS-styled context menu.',
    imageUrl: '/assets/showcase/icons/components/context-menu.png',
    libModules: [
        'ContextMenuModule'
    ],
    libDirectives: [
        'ContextMenuDirective'
    ],
    demoComponents: [
        {
            title: 'ContextMenu Overview',
            componentName: 'ContextMenuOverviewComponent',
            component: ContextMenuOverviewComponent
        }
    ]
};
