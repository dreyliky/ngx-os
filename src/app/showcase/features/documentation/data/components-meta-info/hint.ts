import { OsComponentEnum } from '../../enums';
import { HintOverviewComponent, HintWithSliderComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const HINT_META_INFO: ComponentMetaInfo = {
    name: 'Hint',
    type: OsComponentEnum.Hint,
    shortInfo: 'Provides OS-styled hint.',
    imageUrl: '/assets/showcase/icons/components/hint.png',
    libModules: [
        'HintModule'
    ],
    libDirectives: [
        'HintDirective'
    ],
    demoComponents: [
        {
            title: 'Hint Overview',
            component: HintOverviewComponent,
            componentName: 'HintOverviewComponent'
        },
        {
            title: 'Hint with Slider',
            component: HintWithSliderComponent,
            componentName: 'HintWithSliderComponent'
        }
    ]
};
