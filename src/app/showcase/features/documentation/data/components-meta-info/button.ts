import { ButtonComponent, ButtonModule } from 'ngx-os/modules';
import { OsComponentEnum } from '../../enums';
import { ButtonCounterComponent, ButtonOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const BUTTON_META_INFO: ComponentMetaInfo = {
    name: 'Button',
    type: OsComponentEnum.Button,
    shortInfo: 'OS Button component has custom selector without native <button> element.',
    imageUrl: '/assets/showcase/icons/components/button.png',
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
