import { OsComponentEnum } from '../../enums';
import { SelectionOverviewComponent, SelectionWithAnythingComponent } from '../../examples';
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
        },
        {
            title: 'Selection with anything',
            componentName: 'SelectionWithAnythingComponent',
            component: SelectionWithAnythingComponent
        }
    ]
};
