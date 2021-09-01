import { OsResizableDirective, ResizerModule } from '@lib-modules';
import { ResizerOverviewComponent } from '../../demo';
import { ComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const RESIZER_META_INFO: ComponentMetaInfo = {
    name: 'Resizer',
    type: ComponentEnum.Resizer,
    shortInfo: 'Resizer',
    imageUrl: '/assets/icons/components/resizer.png',
    libModules: [
        ResizerModule
    ],
    libDirectives: [
        OsResizableDirective
    ],
    libInterfaces: [
        'ResizeInfo'
    ],
    libEnums: [
        'ResizerEnum',
        'MouseButtonEnum'
    ],
    libTypes: [
        'xAxisStyleNameType',
        'yAxisStyleNameType'
    ],
    demoComponents: [
        {
            title: 'Resizer Overview',
            component: ResizerOverviewComponent
        }
    ]
};
