import { HeaderComponent, LabelComponent, TextComponent, TextModule } from 'ngx-os/modules';
import { OsComponentEnum } from '../../enums';
import { TextOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const TEXT_META_INFO: ComponentMetaInfo = {
    name: 'Text',
    type: OsComponentEnum.Text,
    shortInfo: 'Provides different views for text.',
    imageUrl: '/assets/showcase/icons/components/text.png',
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