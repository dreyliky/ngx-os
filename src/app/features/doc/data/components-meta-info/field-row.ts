import { FieldRowComponent, FieldRowModule } from '@lib-modules';
import { FieldRowOverviewComponent } from '../../demo';
import { ComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const FIELD_ROW_META_INFO: ComponentMetaInfo = {
    name: 'Field Row',
    type: ComponentEnum.FieldRow,
    shortInfo: 'Field row component short info',
    imageUrl: '/assets/icons/components/folder.png',
    libModules: [
        FieldRowModule
    ],
    libComponents: [
        FieldRowComponent
    ],
    demoComponents: [
        {
            title: 'Field row Overview',
            component: FieldRowOverviewComponent
        }
    ]
};
