import { HeaderComponent, LabelComponent, TextComponent, TextModule } from '@lib-modules';
import { TextOverviewComponent } from '../../demo';
import { OsComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const TEXT_META_INFO: ComponentMetaInfo = {
    name: 'Text',
    type: OsComponentEnum.Text,
    shortInfo: 'Provides different views for text.',
    imageUrl: '/assets/icons/components/text.png',
    libModules: [
        TextModule
    ],
    libComponents: [
        TextComponent,
        HeaderComponent,
        LabelComponent
    ],
    demoComponents: [
        {
            title: 'Text Overview',
            component: TextOverviewComponent
        }
    ]
};
