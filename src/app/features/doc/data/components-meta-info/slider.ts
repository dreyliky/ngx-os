import { SliderComponent, SliderModule } from '@lib-modules';
import { SliderOverviewComponent } from '../../demo';
import { ComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const SLIDER_META_INFO: ComponentMetaInfo = {
    name: 'Slider',
    type: ComponentEnum.Slider,
    shortInfo: 'Slider component short info',
    imageUrl: '/assets/icons/components/slider.png',
    libModules: [
        SliderModule
    ],
    libComponents: [
        SliderComponent
    ],
    demoComponents: [
        {
            title: 'Slider Overview',
            component: SliderOverviewComponent
        }
    ]
};
