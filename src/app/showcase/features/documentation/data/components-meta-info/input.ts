import { OsComponentEnum } from '../../enums';
import {
    FormValidationComponent,
    InputAsFormControlComponent,
    InputNumberOverviewComponent,
    InputOverviewComponent,
    TextareaOverviewComponent
} from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const INPUT_META_INFO: ComponentMetaInfo = {
    name: 'Input',
    type: OsComponentEnum.Input,
    shortInfo: 'Provides the text field for entering a text.',
    imageUrl: '/assets/showcase/icons/components/input.png',
    libModules: [
        'InputModule'
    ],
    libDirectives: [
        'InputDirective',
        'InputNumberDirective',
        'AutofocusDirective'
    ],
    demoComponents: [
        {
            title: 'Input Overview',
            componentName: 'InputOverviewComponent',
            component: InputOverviewComponent
        },
        {
            title: 'InputNumber Overview',
            componentName: 'InputNumberOverviewComponent',
            component: InputNumberOverviewComponent
        },
        {
            title: 'Textarea Overview',
            componentName: 'TextareaOverviewComponent',
            component: TextareaOverviewComponent
        },
        {
            title: 'Input as FormControl',
            componentName: 'InputAsFormControlComponent',
            component: InputAsFormControlComponent
        },
        {
            title: 'Reactive Forms integration',
            componentName: 'FormValidationComponent',
            component: FormValidationComponent
        }
    ]
};
