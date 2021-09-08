import { FormFieldComponent, FormFieldModule } from '@lib-modules';
import { FormFieldOverviewComponent } from '../../demo';
import { OsComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const FORM_FIELD_META_INFO: ComponentMetaInfo = {
    name: 'Form Field',
    type: OsComponentEnum.FormField,
    shortInfo: 'Provides component for wrapping several form components to define a form field.',
    imageUrl: '/assets/icons/components/form-field.png',
    libModules: [
        FormFieldModule
    ],
    libComponents: [
        FormFieldComponent
    ],
    demoComponents: [
        {
            title: 'Form Field Overview',
            component: FormFieldOverviewComponent
        }
    ]
};
