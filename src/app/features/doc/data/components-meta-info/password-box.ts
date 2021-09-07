import { PasswordBoxComponent, PasswordBoxModule } from '@lib-modules';
import { PasswordBoxOverviewComponent } from '../../demo';
import { OsComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const PASSWORD_BOX_META_INFO: ComponentMetaInfo = {
    name: 'Password Box',
    type: OsComponentEnum.PasswordBox,
    shortInfo: 'Provides the same functionality as a native <input type="password">.',
    imageUrl: '/assets/icons/components/password-box.png',
    libModules: [
        PasswordBoxModule
    ],
    libComponents: [
        PasswordBoxComponent
    ],
    libInterfaces: [
        'PasswordBoxChangeEvent'
    ],
    demoComponents: [
        {
            title: 'Password Box Overview',
            component: PasswordBoxOverviewComponent
        }
    ]
};
