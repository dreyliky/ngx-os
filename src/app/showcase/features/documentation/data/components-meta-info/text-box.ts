import { OsComponentEnum } from '../../enums';
import { TextBoxAsFormControlComponent, TextBoxOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const TEXT_BOX_META_INFO: ComponentMetaInfo = {
    name: 'Text Box',
    type: OsComponentEnum.TextBox,
    shortInfo: 'Provides the text field for entering a text.',
    imageUrl: '/assets/showcase/icons/components/text-box.png',
    libModules: [
        'TextBoxModule'
    ],
    libComponents: [
        'TextBoxComponent'
    ],
    libInterfaces: [
        'TextBoxChangeEvent'
    ],
    demoComponents: [
        {
            title: 'Text Box Overview',
            componentName: 'TextBoxOverviewComponent',
            component: TextBoxOverviewComponent
        },
        {
            title: 'Text Box as FormControl',
            componentName: 'TextBoxAsFormControlComponent',
            component: TextBoxAsFormControlComponent
        }
    ]
};
