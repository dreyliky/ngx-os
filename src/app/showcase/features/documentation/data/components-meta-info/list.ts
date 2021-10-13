import { ListComponent, ListItemComponent, ListModule } from 'ngx-os';
import { OsComponentEnum } from '../../enums';
import { ListCustomTemplateComponent, ListOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const LIST_META_INFO: ComponentMetaInfo = {
    name: 'List',
    type: OsComponentEnum.List,
    shortInfo: 'Allows showing a bunch of items in the list view.',
    imageUrl: '/assets/showcase/icons/components/list.png',
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
        },
        {
            title: 'List with custom template',
            component: ListCustomTemplateComponent
        }
    ]
};
