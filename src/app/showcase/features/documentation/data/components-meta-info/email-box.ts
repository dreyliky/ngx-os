import { OsComponentEnum } from '../../enums';
import {
    EmailBoxAsFormControlComponent,
    EmailBoxOverviewComponent,
    EmailBoxValidityOverviewComponent,
    FormValidationComponent
} from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const EMAIL_BOX_META_INFO: ComponentMetaInfo = {
    name: 'Email Box',
    type: OsComponentEnum.EmailBox,
    shortInfo: 'Provides the text field for entering an email.',
    imageUrl: '/assets/showcase/icons/components/email-box.png',
    libModules: [
        'EmailBoxModule'
    ],
    libComponents: [
        'EmailBoxComponent'
    ],
    libInterfaces: [
        'EmailBoxChangeEvent'
    ],
    demoComponents: [
        {
            title: 'Email Box Overview',
            componentName: 'EmailBoxOverviewComponent',
            component: EmailBoxOverviewComponent
        },
        {
            title: 'Email Box as FormControl',
            componentName: 'EmailBoxAsFormControlComponent',
            component: EmailBoxAsFormControlComponent
        },
        {
            title: 'Email Box Validity Overview',
            componentName: 'EmailBoxValidityOverviewComponent',
            component: EmailBoxValidityOverviewComponent
        },
        {
            title: 'Reactive Forms integration',
            componentName: 'FormValidationComponent',
            component: FormValidationComponent
        }
    ]
};
