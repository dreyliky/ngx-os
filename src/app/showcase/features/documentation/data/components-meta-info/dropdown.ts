import { DropdownComponent, DropdownItemComponent, DropdownModule } from 'ngx-os/modules';
import { OsComponentEnum } from '../../enums';
import {
    DropdownAsFormControlComponent, DropdownOverviewComponent,
    DropdownWithCustomContentComponent,
    DropdownWithIntervalValueChangeComponent
} from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const DROPDOWN_META_INFO: ComponentMetaInfo = {
    name: 'Dropdown',
    type: OsComponentEnum.Dropdown,
    shortInfo: 'Provides functional for selecting a value from a set of items.',
    imageUrl: '/assets/showcase/icons/components/dropdown.png',
    libModules: [
        DropdownModule
    ],
    libComponents: [
        DropdownComponent,
        DropdownItemComponent
    ],
    libInterfaces: [
        'IDropdownValueChangeEvent'
    ],
    demoComponents: [
        {
            title: 'Dropdown Overview',
            component: DropdownOverviewComponent
        },
        {
            title: 'Dropdown as FormControl',
            component: DropdownAsFormControlComponent
        },
        {
            title: 'Dropdown with custom content',
            component: DropdownWithCustomContentComponent
        },
        {
            title: 'Dropdown with interval value changing',
            component: DropdownWithIntervalValueChangeComponent,
            isOnlyForDevEnv: true
        }
    ]
};
