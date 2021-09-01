import { TextareaBoxComponent, TextareaBoxModule } from '@lib-modules';
import { TextareaOverviewComponent } from '../../demo';
import { OsComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const TEXTAREA_BOX_META_INFO: ComponentMetaInfo = {
    name: 'Textarea Box',
    type: OsComponentEnum.TextareaBox,
    shortInfo: 'Textarea box component short info',
    imageUrl: '/assets/icons/components/text-box.png',
    libModules: [
        TextareaBoxModule
    ],
    libComponents: [
        TextareaBoxComponent
    ],
    libInterfaces: [
        'TextareaBoxChangeEvent'
    ],
    demoComponents: [
        {
            title: 'Textarea box Overview',
            component: TextareaOverviewComponent
        }
    ]
};
