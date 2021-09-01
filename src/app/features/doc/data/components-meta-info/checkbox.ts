import { CheckboxComponent, CheckboxModule } from '@lib-modules';
import { CheckboxOverviewComponent } from '../../demo';
import { OsComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const CHECKBOX_META_INFO: ComponentMetaInfo = {
    name: 'Checkbox',
    type: OsComponentEnum.Checkbox,
    shortInfo: 'Checkbox component short info',
    imageUrl: '/assets/icons/components/checkbox.png',
    libModules: [
        CheckboxModule
    ],
    libComponents: [
        CheckboxComponent
    ],
    demoComponents: [
        {
            title: 'Checkbox Overview',
            component: CheckboxOverviewComponent
        }
    ]
};
