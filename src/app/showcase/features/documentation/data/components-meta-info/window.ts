import {
    DynamicWindowService,
    DynamicWindowSharedConfigService,
    TitleBarButtonComponent,
    TitleBarComponent,
    TitleBarContentComponent,
    TitleBarControlsComponent,
    TitleBarIconComponent,
    WindowComponent,
    WindowModule
} from 'ngx-os/modules';
import { OsComponentEnum } from '../../enums';
import {
    DynamicWindowCustomizationComponent,
    TitleBarButtonOverviewComponent,
    WindowDynamicOpeningComponent,
    WindowOverviewComponent,
    WindowTitleBarComponent
} from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const WINDOW_META_INFO: ComponentMetaInfo = {
    name: 'Window',
    type: OsComponentEnum.Window,
    shortInfo: 'Provides window functionality.',
    imageUrl: '/assets/showcase/icons/components/window.png',
    libModules: [
        WindowModule
    ],
    libComponents: [
        WindowComponent,
        TitleBarComponent,
        TitleBarContentComponent,
        TitleBarControlsComponent,
        TitleBarButtonComponent,
        TitleBarIconComponent
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
            title: 'Title Bar Overview',
            component: WindowTitleBarComponent
        },
        {
            title: 'Title Bar Button Overview',
            component: TitleBarButtonOverviewComponent
        },
        {
            title: 'Dynamic Window',
            component: WindowDynamicOpeningComponent
        },
        {
            title: 'Dynamic Window customization',
            component: DynamicWindowCustomizationComponent
        }
    ]
};
