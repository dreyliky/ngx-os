import { SliderComponent, SliderModule } from '@lib-modules';
import { SliderOverviewComponent } from '../../demo';
import { OsComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const SLIDER_META_INFO: ComponentMetaInfo = {
    name: 'Slider',
    type: OsComponentEnum.Slider,
    shortInfo: 'Provides the same functionality as a native <input type="slider">.',
    imageUrl: '/assets/icons/components/slider.png',
    libModules: [
        SliderModule
    ],
    libComponents: [
        SliderComponent
    ],
    libInterfaces: [
        'SliderValueChangeEvent'
    ],
    demoComponents: [
        {
            title: 'Slider Overview',
            component: SliderOverviewComponent
        }
    ]
};
