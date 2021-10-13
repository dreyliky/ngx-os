import { ResizableDirective, ResizerModule } from 'ngx-os';
import { OsComponentEnum } from '../../enums';
import {
    ResizerOnAbsoluteElementComponent,
    ResizerOverviewComponent,
    ResizerSpecificSidesComponent
} from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const RESIZER_META_INFO: ComponentMetaInfo = {
    name: 'Resizer',
    type: OsComponentEnum.Resizer,
    shortInfo: 'Provides different features for resizing functionality.',
    imageUrl: '/assets/showcase/icons/components/resizer.png',
    libModules: [
        ResizerModule
    ],
    libDirectives: [
        ResizableDirective
    ],
    libInterfaces: [
        'ResizerConfig',
        'ResizeInfo'
    ],
    libEnums: [
        'ResizerEnum',
        'MouseButtonEnum'
    ],
    demoComponents: [
        {
            title: 'Resizer Overview',
            component: ResizerOverviewComponent
        },
        {
            title: 'Resizer with specific sides',
            component: ResizerSpecificSidesComponent
        },
        {
            title: 'Resizer on absolute element which append to body',
            component: ResizerOnAbsoluteElementComponent
        }
    ]
};
