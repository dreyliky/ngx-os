import { SelectboxComponent, SelectboxModule } from '@lib-modules';
import { SelectboxOverviewComponent } from '../../demo';
import { ComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const SELECTBOX_META_INFO: ComponentMetaInfo = {
    name: 'Selectbox',
    type: ComponentEnum.Selectbox,
    shortInfo: 'Selectbox component short info',
    imageUrl: '/assets/icons/components/selectbox.png',
    libModules: [
        SelectboxModule
    ],
    libComponents: [
        SelectboxComponent
    ],
    libInterfaces: [
        'OptionSelectedEvent'
    ],
    demoComponents: [
        {
            title: 'Selectbox Overview',
            component: SelectboxOverviewComponent
        }
    ]
};
