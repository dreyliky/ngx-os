import { OsComponentEnum } from '../../enums';
import {
    TabGroupLabelCustomizationComponent,
    TabGroupLoadedLazilyComponent,
    TabGroupOverviewComponent
} from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const TAB_GROUP_META_INFO: ComponentMetaInfo = {
    name: 'Tab Group',
    type: OsComponentEnum.TabGroup,
    shortInfo: 'Allows organizing content into separate views separated by tabs.',
    imageUrl: '/assets/showcase/icons/components/tab-group.png',
    libModules: [
        'TabGroupModule'
    ],
    libComponents: [
        'TabGroupComponent',
        'TabComponent'
    ],
    demoComponents: [
        {
            title: 'Tab Group Overview',
            componentName: 'TabGroupOverviewComponent',
            component: TabGroupOverviewComponent
        },
        {
            title: 'Tab Group label customization',
            componentName: 'TabGroupLabelCustomizationComponent',
            component: TabGroupLabelCustomizationComponent
        },
        {
            title: 'Tab Group content is loaded lazily (when activated)',
            componentName: 'TabGroupLoadedLazilyComponent',
            component: TabGroupLoadedLazilyComponent
        }
    ]
};
