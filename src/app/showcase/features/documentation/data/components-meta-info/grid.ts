import { GridComponent, GridItemComponent, GridModule } from 'ngx-os';
import { OsComponentEnum } from '../../enums';
import {
    GridItemCustomizationComponent,
    GridItemWithStaticCoordinateComponent,
    GridOverviewComponent
} from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const GRID_META_INFO: ComponentMetaInfo = {
    name: 'Grid',
    type: OsComponentEnum.Grid,
    shortInfo: 'Provides grid layout functionality.',
    imageUrl: '/assets/showcase/icons/components/grid.png',
    libModules: [
        GridModule
    ],
    libComponents: [
        GridComponent,
        GridItemComponent
    ],
    libEnums: [
        'GridDirectionEnum'
    ],
    demoComponents: [
        {
            title: 'Grid Overview',
            component: GridOverviewComponent
        },
        {
            title: 'Grid Item Customization',
            component: GridItemCustomizationComponent
        },
        {
            title: 'Grid Item with Static Coordinate',
            component: GridItemWithStaticCoordinateComponent
        }
    ]
};
