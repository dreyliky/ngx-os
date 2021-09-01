import { ListComponent, ListItemComponent, ListModule } from '@lib-modules';
import { ListOverviewComponent } from '../../demo';
import { ComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const LIST_META_INFO: ComponentMetaInfo = {
    name: 'List',
    type: ComponentEnum.List,
    shortInfo: 'List component short info',
    imageUrl: '/assets/icons/components/list.png',
    libModules: [
        ListModule
    ],
    libComponents: [
        ListComponent,
        ListItemComponent
    ],
    demoComponents: [
        {
            title: 'List Overview',
            component: ListOverviewComponent
        }
    ]
};
