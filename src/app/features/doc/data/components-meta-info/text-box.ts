import { FieldRowComponent, TextareaBoxComponent, TextBoxComponent, TextBoxModule } from '@lib-modules';
import { FieldRowOverviewComponent, TextareaOverviewComponent, TextBoxOverviewComponent } from '../../demo';
import { OsComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const TEXT_BOX_META_INFO: ComponentMetaInfo = {
    name: 'Text Box',
    type: OsComponentEnum.TextBox,
    shortInfo: 'Provides different text fields.',
    imageUrl: '/assets/icons/components/text-box.png',
    libModules: [
        TextBoxModule
    ],
    libComponents: [
        TextBoxComponent,
        TextareaBoxComponent,
        FieldRowComponent
    ],
    libInterfaces: [
        'TextBoxChangeEvent',
        'TextareaBoxChangeEvent'
    ],
    libTypes: [
        'TextboxType'
    ],
    demoComponents: [
        {
            title: 'Text Box Overview',
            component: TextBoxOverviewComponent
        },
        {
            title: 'Textarea Box Overview',
            component: TextareaOverviewComponent
        },
        {
            title: 'Field Row Overview',
            component: FieldRowOverviewComponent
        }
    ]
};
