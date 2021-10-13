import { EmailBoxComponent, EmailBoxModule } from 'ngx-os';
import { OsComponentEnum } from '../../enums';
import { EmailBoxAsFormControlComponent, EmailBoxOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const EMAIL_BOX_META_INFO: ComponentMetaInfo = {
    name: 'Email Box',
    type: OsComponentEnum.EmailBox,
    shortInfo: 'Provides the same functionality as a native <input type="email">.',
    imageUrl: '/assets/showcase/icons/components/email-box.png',
    libModules: [
        EmailBoxModule
    ],
    libComponents: [
        EmailBoxComponent
    ],
    libInterfaces: [
        'EmailBoxChangeEvent'
    ],
    demoComponents: [
        {
            title: 'Email Box Overview',
            component: EmailBoxOverviewComponent
        },
        {
            title: 'Email Box as FormControl',
            component: EmailBoxAsFormControlComponent
        }
    ]
};
