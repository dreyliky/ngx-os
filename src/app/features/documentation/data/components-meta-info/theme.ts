import { AccentColorService, ThemeService } from '@lib-modules';
import { OsComponentEnum } from '../../enums';
import { ThemeDifferentStylingComponent, ThemeOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const THEME_META_INFO: ComponentMetaInfo = {
    name: 'Theme',
    type: OsComponentEnum.Theme,
    shortInfo: 'Provides functionality to manipulate different themes and accent colors.',
    imageUrl: '/assets/icons/components/theme.png',
    libServices: [
        ThemeService,
        AccentColorService
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
        },
        {
            title: 'Different styling based on the current theme',
            component: ThemeDifferentStylingComponent
        }
    ]
};
