import { SelectboxComponent, SelectboxModule } from '@lib-modules';
import { SelectboxOverviewComponent } from '../../demo';
import { OsComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const SELECTBOX_META_INFO: ComponentMetaInfo = {
    name: 'Selectbox',
    type: OsComponentEnum.Selectbox,
    shortInfo: 'Provides functional for selecting a value from a set of options, similar to the native <select>.',
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
