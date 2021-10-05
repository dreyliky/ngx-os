import {
    AppendToBodyConfig,
    AppendToBodyDirective,
    FixedToParentConfig,
    FixedToParentDirective,
    UtilsModule
} from 'ngx-os/modules';
import { OsComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const UTILS_META_INFO: ComponentMetaInfo = {
    name: 'Utils',
    type: OsComponentEnum.Utils,
    shortInfo: 'Provides helper functionality.',
    imageUrl: '/assets/showcase/icons/components/utils.png',
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