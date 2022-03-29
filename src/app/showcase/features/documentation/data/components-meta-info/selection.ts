import { OsComponentEnum } from '../../enums';
import { SelectionOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const SELECTION_META_INFO: ComponentMetaInfo = {
    name: 'Selection',
    type: OsComponentEnum.Selection,
    shortInfo: 'Provides selection functionality.',
    imageUrl: '/assets/showcase/icons/components/selection.png',
    libModules: [
        'SelectionModule'
    ],
    libDirectives: [
        'SelectionZoneDirective',
        'SelectionItemDirective'
    ],
    demoComponents: [
        {
            title: 'Selection Overview',
            componentName: 'SelectionOverviewComponent',
            component: SelectionOverviewComponent
        }
    ]
};
