import { NumberBoxComponent, NumberBoxModule } from '@lib-modules';
import { OsComponentEnum } from '../../enums';
import { NumberBoxAsFormControlComponent, NumberBoxOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const NUMBER_BOX_META_INFO: ComponentMetaInfo = {
    name: 'Number Box',
    type: OsComponentEnum.NumberBox,
    shortInfo: 'Provides the same functionality as a native <input type="number">.',
    imageUrl: '/assets/icons/components/number-box.png',
    libModules: [
        NumberBoxModule
    ],
    libComponents: [
        NumberBoxComponent
    ],
    libInterfaces: [
        'INumberBoxChangeEvent'
    ],
    demoComponents: [
        {
            title: 'Number Box Overview',
            component: NumberBoxOverviewComponent
        },
        {
            title: 'Number Box as FormControl',
            component: NumberBoxAsFormControlComponent
        }
    ]
};
