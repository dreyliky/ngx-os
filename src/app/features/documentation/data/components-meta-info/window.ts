import {
    DynamicWindowService,
    DynamicWindowSharedConfigService,
    TitleBarComponent,
    WindowComponent,
    WindowModule
} from '@lib-modules';
import { OsComponentEnum } from '../../enums';
import {
    DynamicWindowCustomizationComponent, TitleBarButtonOverviewComponent,
    WindowDynamicOpeningComponent,
    WindowOverviewComponent,
    WindowTitleBarComponent
} from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const WINDOW_META_INFO: ComponentMetaInfo = {
    name: 'Window',
    type: OsComponentEnum.Window,
    shortInfo: 'Provides window functionality.',
    imageUrl: '/assets/icons/components/window.png',
    libModules: [
        WindowModule
    ],
    libComponents: [
        WindowComponent,
        TitleBarComponent
    ],
    libServices: [
        DynamicWindowService,
        DynamicWindowSharedConfigService
    ],
    libInterfaces: [
        'IDynamicWindowRef',
        'IDynamicWindowParams',
        'IDynamicWindowFullscreenOffset',
        'ICssCoordinate'
    ],
    demoComponents: [
        {
            title: 'Window Overview',
            component: WindowOverviewComponent
        },
        {
            title: 'Dynamic Window',
            component: WindowDynamicOpeningComponent
        },
        {
            title: 'Dynamic Window customization',
            component: DynamicWindowCustomizationComponent
        },
        {
            title: 'Title Bar Overview',
            component: WindowTitleBarComponent
        },
        {
            title: 'Title Bar Button Overview',
            component: TitleBarButtonOverviewComponent
        }
    ]
};
