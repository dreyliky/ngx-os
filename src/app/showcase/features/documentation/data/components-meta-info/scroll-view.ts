import { OsComponentEnum } from '../../enums';
import { ScrollViewOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const SCROLL_VIEW_META_INFO: ComponentMetaInfo = {
    name: 'Scroll View',
    type: OsComponentEnum.ScrollView,
    shortInfo: 'Provides container with scroll bars.',
    imageUrl: '/assets/showcase/icons/components/scroll-view.png',
    libModules: [
        'ScrollViewModule'
    ],
    libComponents: [
        'ScrollViewComponent'
    ],
    demoComponents: [
        {
            title: 'Scroll View Overview',
            componentName: 'ScrollViewOverviewComponent',
            component: ScrollViewOverviewComponent
        }
    ]
};
