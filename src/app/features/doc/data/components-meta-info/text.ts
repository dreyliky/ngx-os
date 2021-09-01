import { HeaderComponent, TextComponent, TextModule } from '@lib-modules';
import { TextOverviewComponent } from '../../demo';
import { OsComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const TEXT_META_INFO: ComponentMetaInfo = {
    name: 'Text',
    type: OsComponentEnum.Text,
    shortInfo: 'Text component short info',
    imageUrl: '/assets/icons/components/text.png',
    libModules: [
        TextModule
    ],
    libComponents: [
        TextComponent,
        HeaderComponent
    ],
    demoComponents: [
        {
            title: 'Text Overview',
            component: TextOverviewComponent
        }
    ]
};
