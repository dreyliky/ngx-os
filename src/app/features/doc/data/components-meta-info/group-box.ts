import { GroupBoxComponent, GroupBoxModule } from '@lib-modules';
import { GroupBoxOverviewComponent } from '../../demo';
import { ComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const GROUP_BOX_META_INFO: ComponentMetaInfo = {
    name: 'Group Box',
    type: ComponentEnum.GroupBox,
    shortInfo: 'Group Box component short info',
    imageUrl: '/assets/icons/components/group-box.png',
    libModules: [
        GroupBoxModule
    ],
    libComponents: [
        GroupBoxComponent
    ],
    demoComponents: [
        {
            title: 'Group box Overview',
            component: GroupBoxOverviewComponent
        }
    ]
};
