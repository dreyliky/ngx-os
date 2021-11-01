import { OsComponentEnum } from '../../enums';
import { NumberBoxAsFormControlComponent, NumberBoxOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const NUMBER_BOX_META_INFO: ComponentMetaInfo = {
    name: 'Number Box',
    type: OsComponentEnum.NumberBox,
    shortInfo: 'Provides the text field for entering a number (integer or decimal).',
    imageUrl: '/assets/showcase/icons/components/number-box.png',
    libModules: [
        'NumberBoxModule'
    ],
    libComponents: [
        'NumberBoxComponent'
    ],
    libInterfaces: [
        'NumberBoxChangeEvent'
    ],
    demoComponents: [
        {
            title: 'Number Box Overview',
            componentName: 'NumberBoxOverviewComponent',
            component: NumberBoxOverviewComponent
        },
        {
            title: 'Number Box as FormControl',
            componentName: 'NumberBoxAsFormControlComponent',
            component: NumberBoxAsFormControlComponent
        }
    ]
};
