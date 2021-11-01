import { OsComponentEnum } from '../../enums';
import {
    DropdownAsFormControlComponent,
    DropdownOverviewComponent,
    DropdownWithIntervalValueChangeComponent,
    DropdownСustomizationComponent
} from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const DROPDOWN_META_INFO: ComponentMetaInfo = {
    name: 'Dropdown',
    type: OsComponentEnum.Dropdown,
    shortInfo: 'Provides functional for selecting a value from a set of items.',
    imageUrl: '/assets/showcase/icons/components/dropdown.png',
    libModules: [
        'DropdownModule'
    ],
    libComponents: [
        'DropdownComponent',
        'DropdownItemComponent'
    ],
    libInterfaces: [
        'DropdownValueChangeEvent'
    ],
    demoComponents: [
        {
            title: 'Dropdown Overview',
            componentName: 'DropdownOverviewComponent',
            component: DropdownOverviewComponent
        },
        {
            title: 'Dropdown as FormControl',
            componentName: 'DropdownAsFormControlComponent',
            component: DropdownAsFormControlComponent
        },
        {
            title: 'Dropdown customization',
            componentName: 'DropdownСustomizationComponent',
            component: DropdownСustomizationComponent
        },
        {
            title: 'Dropdown with interval value changing',
            componentName: 'DropdownWithIntervalValueChangeComponent,',
            component: DropdownWithIntervalValueChangeComponent,
            isOnlyForDevEnv: true
        }
    ]
};
