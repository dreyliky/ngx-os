import { OsComponentEnum } from '../../enums';
import {
    FormValidationComponent,
    PasswordBoxAsFormControlComponent,
    PasswordBoxOverviewComponent
} from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const PASSWORD_BOX_META_INFO: ComponentMetaInfo = {
    name: 'Password Box',
    type: OsComponentEnum.PasswordBox,
    shortInfo: 'Provides the text field for entering a password.',
    imageUrl: '/assets/showcase/icons/components/password-box.png',
    libModules: [
        'PasswordBoxModule'
    ],
    libComponents: [
        'PasswordBoxComponent'
    ],
    libInterfaces: [
        'PasswordBoxChangeEvent'
    ],
    demoComponents: [
        {
            title: 'Password Box Overview',
            componentName: 'PasswordBoxOverviewComponent',
            component: PasswordBoxOverviewComponent
        },
        {
            title: 'Password Box as FormControl',
            componentName: 'PasswordBoxAsFormControlComponent',
            component: PasswordBoxAsFormControlComponent
        },
        {
            title: 'Reactive Forms integration',
            componentName: 'FormValidationComponent',
            component: FormValidationComponent
        }
    ]
};
