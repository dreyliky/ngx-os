import { TextBoxComponent, TextBoxModule } from '@lib-modules';
import { TextBoxOverviewComponent } from '../../demo';
import { OsComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const TEXT_BOX_META_INFO: ComponentMetaInfo = {
    name: 'Text Box',
    type: OsComponentEnum.TextBox,
    shortInfo: 'Text box component short info',
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
    libTypes: [
        'TextboxType'
    ],
    demoComponents: [
        {
            title: 'Text box Overview',
            component: TextBoxOverviewComponent
        }
    ]
};
