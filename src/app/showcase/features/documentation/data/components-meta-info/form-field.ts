import { OsComponentEnum } from '../../enums';
import { FormFieldOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const FORM_FIELD_META_INFO: ComponentMetaInfo = {
    name: 'Form Field',
    type: OsComponentEnum.FormField,
    shortInfo: 'Provides component for wrapping several form components to define a form field.',
    imageUrl: '/assets/showcase/icons/components/form-field.png',
    libModules: [
        'FormFieldModule'
    ],
    libComponents: [
        'FormFieldComponent'
    ],
    demoComponents: [
        {
            title: 'Form Field Overview',
            component: FormFieldOverviewComponent
        }
    ]
};
