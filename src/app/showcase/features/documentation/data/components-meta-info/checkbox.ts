import { OsComponentEnum } from '../../enums';
import { CheckboxAsFormControlComponent, CheckboxOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const CHECKBOX_META_INFO: ComponentMetaInfo = {
    name: 'Checkbox',
    type: OsComponentEnum.Checkbox,
    shortInfo: 'Provides the same functionality as a native <input type="checkbox">.',
    imageUrl: '/assets/showcase/icons/components/checkbox.png',
    libModules: [
        'CheckboxModule'
    ],
    libComponents: [
        'CheckboxComponent'
    ],
    libInterfaces: [
        'CheckboxValueChangeEvent'
    ],
    demoComponents: [
        {
            title: 'Checkbox Overview',
            componentName: 'CheckboxOverviewComponent',
            component: CheckboxOverviewComponent
        },
        {
            title: 'Checkbox as FormControl',
            componentName: 'CheckboxAsFormControlComponent',
            component: CheckboxAsFormControlComponent
        }
    ]
};
