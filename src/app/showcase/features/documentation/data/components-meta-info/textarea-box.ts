import { TextareaBoxComponent, TextareaBoxModule } from 'ngx-os';
import { OsComponentEnum } from '../../enums';
import { TextareaAsFormControlComponent, TextareaOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const TEXTAREA_BOX_META_INFO: ComponentMetaInfo = {
    name: 'Textarea Box',
    type: OsComponentEnum.TextareaBox,
    shortInfo: 'Provides the same functionality as a native <textarea>.',
    imageUrl: '/assets/showcase/icons/components/text-box.png',
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
            title: 'Textarea Box Overview',
            component: TextareaOverviewComponent
        },
        {
            title: 'Textarea Box as FormControl',
            component: TextareaAsFormControlComponent
        }
    ]
};
