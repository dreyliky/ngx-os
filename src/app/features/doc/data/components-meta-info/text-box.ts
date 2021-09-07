import { TextBoxComponent, TextBoxModule } from '@lib-modules';
import { TextBoxOverviewComponent } from '../../demo';
import { OsComponentEnum } from '../../enums';
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
        'TextBoxChangeEvent'
    ],
    demoComponents: [
        {
            title: 'Text box Overview',
            component: TextBoxOverviewComponent
        }
    ]
};
