import { AccentColorService, ThemeService } from 'ngx-os/modules';
import { OsComponentEnum, OsComponentOverviewSectionEnum as OverviewSection } from '../../enums';
import { ThemeDifferentStylingComponent, ThemeOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const THEME_META_INFO: ComponentMetaInfo = {
    name: 'Theme',
    type: OsComponentEnum.Theme,
    shortInfo: 'Provides functionality to manipulate different themes and accent colors.',
    imageUrl: '/assets/showcase/icons/components/theme.png',
    forbiddenOverviewSections: [
        OverviewSection.Theming
    ],
    libServices: [
        ThemeService,
        AccentColorService
    ],
    libInterfaces: [
        'IThemeRgbColor'
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
