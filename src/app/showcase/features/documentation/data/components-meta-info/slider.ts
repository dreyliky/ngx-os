import { OsComponentEnum } from '../../enums';
import { SliderAsFormControlComponent, SliderOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const SLIDER_META_INFO: ComponentMetaInfo = {
    name: 'Slider',
    type: OsComponentEnum.Slider,
    shortInfo: 'Provides the same functionality as a native <input type="range">.',
    imageUrl: '/assets/showcase/icons/components/slider.png',
    libModules: [
        'SliderModule'
    ],
    libComponents: [
        'SliderComponent'
    ],
    libInterfaces: [
        'SliderValueChangeEvent'
    ],
    demoComponents: [
        {
            title: 'Slider Overview',
            componentName: 'SliderOverviewComponent',
            component: SliderOverviewComponent
        },
        {
            title: 'Slider as FormControl',
            componentName: 'SliderAsFormControlComponent',
            component: SliderAsFormControlComponent
        }
    ]
};
