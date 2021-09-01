import {
    DynamicWindowService,
    TitleBarComponent,
    WindowComponent,
    WindowModule
} from '@lib-modules';
import { WindowDynamicOpeningComponent, WindowOverviewComponent, WindowTitleBarComponent } from '../../demo';
import { ComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const WINDOW_META_INFO: ComponentMetaInfo = {
    name: 'Window',
    type: ComponentEnum.Window,
    shortInfo: 'Window component short info',
    imageUrl: '/assets/icons/components/window.png',
    libModules: [
        WindowModule
    ],
    libComponents: [
        WindowComponent,
        TitleBarComponent
    ],
    libServices: [
        DynamicWindowService
    ],
    libInterfaces: [
        'IDynamicWindowRef',
        'DynamicWindowParams'
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
            title: 'Title Bar Overview',
            component: WindowTitleBarComponent
        }
    ]
};
