import { ListComponent, ListItemComponent, ListModule } from '@lib-modules';
import { OsComponentEnum } from '../../enums';
import { ListOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const LIST_META_INFO: ComponentMetaInfo = {
    name: 'List',
    type: OsComponentEnum.List,
    shortInfo: 'Allows showing a bunch of items in the list view.',
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
