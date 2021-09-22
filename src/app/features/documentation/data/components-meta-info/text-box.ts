import { TextBoxComponent, TextBoxModule } from '@lib-modules';
import { OsComponentEnum } from '../../enums';
import { TextBoxAsFormControlComponent, TextBoxOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const TEXT_BOX_META_INFO: ComponentMetaInfo = {
    name: 'Text Box',
    type: OsComponentEnum.TextBox,
    shortInfo: 'Provides the same functionality as a native <input type="text">.',
    imageUrl: '/assets/icons/components/text-box.png',
    libModules: [
        TextBoxModule
    ],
    libComponents: [
        TextBoxComponent
    ],
    libInterfaces: [
        'ITextBoxChangeEvent'
    ],
    demoComponents: [
        {
            title: 'Text Box Overview',
            component: TextBoxOverviewComponent
        },
        {
            title: 'Text Box as FormControl',
            component: TextBoxAsFormControlComponent
        }
    ]
};
