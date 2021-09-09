import { ThemeService } from '@lib-modules';
import { OsComponentEnum } from '../../enums';
import { ThemeOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const THEME_META_INFO: ComponentMetaInfo = {
    name: 'Theme',
    type: OsComponentEnum.Theme,
    shortInfo: 'Provides functionality to manipulate different themes and accent colors.',
    imageUrl: '/assets/icons/components/theme.png',
    libServices: [
        ThemeService
    ],
    libInterfaces: [
        'ThemeRgbColor'
    ],
    libEnums: [
        'ThemeEnum'
    ],
    libTypes: [
        'ThemeColorType'
    ],
    demoComponents: [
        {
            title: 'Theme Overview',
            component: ThemeOverviewComponent
        }
    ]
};
