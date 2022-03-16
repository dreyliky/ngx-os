import { OsComponentEnum } from '../../enums';
import { DividerOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const DIVIDER_META_INFO: ComponentMetaInfo = {
    name: 'Divider',
    type: OsComponentEnum.Divider,
    shortInfo: 'Provides OS-styled divider component.',
    imageUrl: '/assets/showcase/icons/components/button.png',
    libModules: [
        'DividerModule'
    ],
    libComponents: [
        'DividerComponent'
    ],
    demoComponents: [
        {
            title: 'Divider Overview',
            componentName: 'DividerOverviewComponent',
            component: DividerOverviewComponent
        }
    ]
};
