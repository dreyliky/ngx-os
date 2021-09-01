import { ButtonComponent, ButtonModule } from '@lib-modules';
import { ButtonCounterComponent, ButtonOverviewComponent } from '../../demo';
import { ComponentMetaInfo } from '../../interfaces';

export const BUTTON_META_INFO: ComponentMetaInfo = {
    name: 'Button',
    type: 'button',
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
