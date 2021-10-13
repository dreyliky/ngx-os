import { TabComponent, TabGroupComponent, TabGroupModule } from 'ngx-os';
import { OsComponentEnum } from '../../enums';
import { TabGroupOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const TAB_GROUP_META_INFO: ComponentMetaInfo = {
    name: 'Tab Group',
    type: OsComponentEnum.TabGroup,
    shortInfo: 'Allows organizing content into separate views separated by tabs.',
    imageUrl: '/assets/showcase/icons/components/tab-group.png',
    libModules: [
        TabGroupModule
    ],
    libComponents: [
        TabGroupComponent,
        TabComponent
    ],
    demoComponents: [
        {
            title: 'Tab Group Overview',
            component: TabGroupOverviewComponent
        }
    ]
};
