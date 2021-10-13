import { NumberBoxComponent, NumberBoxModule } from 'ngx-os';
import { OsComponentEnum } from '../../enums';
import { NumberBoxAsFormControlComponent, NumberBoxOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const NUMBER_BOX_META_INFO: ComponentMetaInfo = {
    name: 'Number Box',
    type: OsComponentEnum.NumberBox,
    shortInfo: 'Provides the same functionality as a native <input type="number">.',
    imageUrl: '/assets/showcase/icons/components/number-box.png',
    libModules: [
        NumberBoxModule
    ],
    libComponents: [
        NumberBoxComponent
    ],
    libInterfaces: [
        'NumberBoxChangeEvent'
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
