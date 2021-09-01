import { ThemeService } from '@lib-modules';
import { ThemeOverviewComponent } from '../../demo';
import { ComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const THEME_META_INFO: ComponentMetaInfo = {
    name: 'Theme',
    type: ComponentEnum.Theme,
    shortInfo: 'Theme short info',
    imageUrl: '/assets/icons/components/theme.png',
    libServices: [
        ThemeService
    ],
    demoComponents: [
        {
            title: 'Theme Overview',
            component: ThemeOverviewComponent
        }
    ]
};
