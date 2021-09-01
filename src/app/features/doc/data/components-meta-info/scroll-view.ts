import { ScrollViewComponent, ScrollViewModule } from '@lib-modules';
import { ScrollViewOverviewComponent } from '../../demo';
import { ComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const SCROLL_VIEW_META_INFO: ComponentMetaInfo = {
    name: 'Scroll View',
    type: ComponentEnum.ScrollView,
    shortInfo: 'Scroll view component short info',
    imageUrl: '/assets/icons/components/scroll-view.png',
    libModules: [
        ScrollViewModule
    ],
    libComponents: [
        ScrollViewComponent
    ],
    demoComponents: [
        {
            title: 'Scroll View Overview',
            component: ScrollViewOverviewComponent
        }
    ]
};
