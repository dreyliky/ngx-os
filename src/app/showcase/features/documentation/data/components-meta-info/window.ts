import { OsComponentEnum } from '../../enums';
import {
    DynamicWindowCustomizationComponent,
    TitleBarButtonOverviewComponent,
    WindowDynamicCustomDraggingLogicComponent,
    WindowDynamicObserveEventsComponent,
    WindowDynamicOpeningComponent,
    WindowOverviewComponent,
    WindowTitleBarComponent
} from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const WINDOW_META_INFO: ComponentMetaInfo = {
    name: 'Window',
    type: OsComponentEnum.Window,
    shortInfo: 'Provides OS-styled window functionality.',
    imageUrl: '/assets/showcase/icons/components/window.png',
    libModules: [
        'WindowModule'
    ],
    libComponents: [
        'WindowComponent',
        'TitleBarComponent',
        'TitleBarContentComponent',
        'TitleBarControlsComponent',
        'TitleBarButtonComponent',
        'TitleBarIconComponent'
    ],
    libServices: [
        'DynamicWindowService',
        'DynamicWindowSharedConfigService'
    ],
    libInterfaces: [
        'DynamicWindowRef',
        'DynamicWindowConfig',
        'DynamicWindowFullscreenOffset',
        'CssCoordinate'
    ],
    libVariables: [
        'DYNAMIC_WINDOW_REF',
        'DYNAMIC_WINDOW_SHARED_CONFIG',
        'IS_DYNAMIC_WINDOW_CONTEXT'
    ],
    demoComponents: [
        {
            title: 'Window Overview',
            componentName: 'WindowOverviewComponent',
            component: WindowOverviewComponent
        },
        {
            title: 'Title Bar Overview',
            componentName: 'WindowTitleBarComponent',
            component: WindowTitleBarComponent
        },
        {
            title: 'Title Bar Button Overview',
            componentName: 'TitleBarButtonOverviewComponent',
            component: TitleBarButtonOverviewComponent
        },
        {
            title: 'Dynamic Window',
            componentName: 'WindowDynamicOpeningComponent',
            component: WindowDynamicOpeningComponent
        },
        {
            title: 'Dynamic Window customization',
            componentName: 'DynamicWindowCustomizationComponent',
            component: DynamicWindowCustomizationComponent
        },
        {
            title: 'Dynamic Window observe events',
            componentName: 'WindowDynamicObserveEventsComponent',
            component: WindowDynamicObserveEventsComponent
        },
        {
            title: 'Dynamic Window custom dragging logic implementation',
            componentName: 'WindowDynamicCustomDraggingLogicComponent',
            component: WindowDynamicCustomDraggingLogicComponent
        }
    ]
};
