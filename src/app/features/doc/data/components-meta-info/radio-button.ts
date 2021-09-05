import { RadioButtonComponent, RadioButtonModule } from '@lib-modules';
import { RadioButtonOverviewComponent } from '../../demo';
import { OsComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const RADIO_BUTTON_META_INFO: ComponentMetaInfo = {
    name: 'Radio Button',
    type: OsComponentEnum.RadioButton,
    shortInfo: 'Provides the same functionality as a native <input type="radio">.',
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
