import { GroupBoxComponent, GroupBoxModule } from '@lib-modules';
import { GroupBoxOverviewComponent } from '../../demo';
import { OsComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const GROUP_BOX_META_INFO: ComponentMetaInfo = {
    name: 'Group Box',
    type: OsComponentEnum.GroupBox,
    shortInfo: 'Allows group a bunch of elements at one block.',
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
