import {
    AccentColorService,
    AvailableForOsDirective,
    ForbiddenForOsDirective,
    ThemeModule,
    ThemeService
} from 'ngx-os';
import { OsComponentEnum, OsComponentOverviewSectionEnum as OverviewSection } from '../../enums';
import {
    ThemeAvailabilityDirectivesComponent,
    ThemeDifferentStylingComponent,
    ThemeOverviewComponent
} from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const THEME_META_INFO: ComponentMetaInfo = {
    name: 'Theme',
    type: OsComponentEnum.Theme,
    shortInfo: 'Provides functionality to manipulate different themes and accent colors.',
    imageUrl: '/assets/showcase/icons/components/theme.png',
    forbiddenOverviewSections: [
        OverviewSection.Theming
    ],
    libModules: [
        ThemeModule
    ],
    libServices: [
        ThemeService,
        AccentColorService
    ],
    libDirectives: [
        AvailableForOsDirective,
        ForbiddenForOsDirective
    ],
    libInterfaces: [
        'ThemeRgbColor'
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
        },
        {
            title: 'AvailableForOs & ForbiddenForOs Directives',
            component: ThemeAvailabilityDirectivesComponent
        }
    ]
};
