import { ButtonComponent, ButtonModule } from '@lib-modules';
import { ButtonCounterComponent, ButtonOverviewComponent } from '../../demo';
import { ComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const BUTTON_META_INFO: ComponentMetaInfo = {
    name: 'Button',
    type: ComponentEnum.Button,
    shortInfo: 'Button component short info',
    imageUrl: '/assets/icons/components/button.png',
    libModules: [
        ButtonModule
    ],
    libComponents: [
        ButtonComponent
    ],
    demoComponents: [
        {
            title: 'Buttons with different states',
            component: ButtonOverviewComponent
        },
        {
            title: 'Counter',
            component: ButtonCounterComponent
        }
    ]
};
