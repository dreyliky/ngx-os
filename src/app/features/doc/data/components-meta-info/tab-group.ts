import { TabGroupComponent, TabGroupModule } from '@lib-modules';
import { TabGroupOverviewComponent } from '../../demo';
import { ComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const TAB_GROUP_META_INFO: ComponentMetaInfo = {
    name: 'Tab Group',
    type: ComponentEnum.TabGroup,
    shortInfo: 'Tab Group component short info',
    imageUrl: '/assets/icons/components/tab-group.png',
    libModules: [
        TabGroupModule
    ],
    libComponents: [
        TabGroupComponent
    ],
    demoComponents: [
        {
            title: 'Tab Group Overview',
            component: TabGroupOverviewComponent
        }
    ]
};
