import { OsComponentEnum } from '../../enums';
import {
    MenuBarOverviewComponent,
    MenuBarUsageByViewChildComponent
} from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const MENU_BAR_META_INFO: ComponentMetaInfo = {
    name: 'Menu Bar',
    type: OsComponentEnum.MenuBar,
    shortInfo: 'Provides OS-styled menu bar component.',
    imageUrl: '/assets/showcase/icons/components/menu-bar.png',
    libModules: [
        'MenuBarModule'
    ],
    libComponents: [
        'MenuBarComponent',
        'MenuBarButtonComponent'
    ],
    demoComponents: [
        {
            title: 'Menu Bar Overview',
            componentName: 'MenuBarOverviewComponent',
            component: MenuBarOverviewComponent
        },
        {
            title: 'Menu Bar usage via ViewChild decorator',
            componentName: 'MenuBarUsageByViewChildComponent',
            component: MenuBarUsageByViewChildComponent
        }
    ]
};
