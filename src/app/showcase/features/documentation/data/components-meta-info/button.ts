import { OsComponentEnum } from '../../enums';
import { ButtonCounterComponent, ButtonOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const BUTTON_META_INFO: ComponentMetaInfo = {
    name: 'Button',
    type: OsComponentEnum.Button,
    shortInfo: 'Provides OS-styled button component.',
    imageUrl: '/assets/showcase/icons/components/button.png',
    libModules: [
        'ButtonModule'
    ],
    libDirectives: [
        'ButtonDirective',
        'ButtonLinkDirective'
    ],
    demoComponents: [
        {
            title: 'Buttons with different states',
            componentName: 'ButtonOverviewComponent',
            component: ButtonOverviewComponent
        },
        {
            title: 'Counter',
            componentName: 'ButtonCounterComponent',
            component: ButtonCounterComponent
        }
    ]
};
