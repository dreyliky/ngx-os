import { RadioButtonComponent, RadioButtonModule } from '@lib-modules';
import { RadioButtonOverviewComponent } from '../../demo';
import { OsComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const RADIO_BUTTON_META_INFO: ComponentMetaInfo = {
    name: 'Radio Button',
    type: OsComponentEnum.RadioButton,
    shortInfo: 'Radio button component short info',
    imageUrl: '/assets/icons/components/radio-button.png',
    libModules: [
        RadioButtonModule
    ],
    libComponents: [
        RadioButtonComponent
    ],
    libInterfaces: [
        'RadioButtonValueChangeEvent'
    ],
    demoComponents: [
        {
            title: 'Radio button Overview',
            component: RadioButtonOverviewComponent
        }
    ]
};
