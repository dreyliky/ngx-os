import { OsComponentEnum } from '../../enums';
import { TextareaAsFormControlComponent, TextareaOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const TEXTAREA_BOX_META_INFO: ComponentMetaInfo = {
    name: 'Textarea Box',
    type: OsComponentEnum.TextareaBox,
    shortInfo: 'Provides the text field for entering a multi-line text.',
    imageUrl: '/assets/showcase/icons/components/text-box.png',
    libModules: [
        'TextareaBoxModule'
    ],
    libComponents: [
        'TextareaBoxComponent'
    ],
    libInterfaces: [
        'TextareaBoxChangeEvent'
    ],
    demoComponents: [
        {
            title: 'Textarea Box Overview',
            componentName: 'TextareaOverviewComponent',
            component: TextareaOverviewComponent
        },
        {
            title: 'Textarea Box as FormControl',
            componentName: 'TextareaAsFormControlComponent',
            component: TextareaAsFormControlComponent
        }
    ]
};
