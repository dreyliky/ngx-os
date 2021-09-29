import {
    AppendToBodyConfig,
    AppendToBodyDirective,
    FixedToParentConfig,
    FixedToParentDirective,
    UtilsModule
} from '@lib-modules';
import { OsComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const UTILS_META_INFO: ComponentMetaInfo = {
    name: 'Utils',
    type: OsComponentEnum.Utils,
    shortInfo: 'Provides helper functionality.',
    imageUrl: '/assets/icons/components/utils.png',
    libModules: [
        UtilsModule
    ],
    libDirectives: [
        AppendToBodyDirective,
        FixedToParentDirective
    ],
    libClasses: [
        AppendToBodyConfig,
        FixedToParentConfig
    ],
    demoComponents: []
};
