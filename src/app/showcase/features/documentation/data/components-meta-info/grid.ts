import { GridComponent, GridItemComponent, GridModule } from 'ngx-os/modules';
import { OsComponentEnum } from '../../enums';
import { GridOverviewComponent } from '../../examples';
import { ComponentMetaInfo } from '../../interfaces';

export const GRID_META_INFO: ComponentMetaInfo = {
    name: 'Grid',
    type: OsComponentEnum.Grid,
    shortInfo: 'Provides grid layout functionality with different views.',
    imageUrl: '/assets/showcase/icons/components/grid.png',
    libModules: [
        GridModule
    ],
    libComponents: [
        GridComponent,
        GridItemComponent
    ],
    libInterfaces: [
        'IGridItem'
    ],
    libEnums: [
        'GridDirectionEnum'
    ],
    demoComponents: [
        {
            title: 'Grid Overview',
            component: GridOverviewComponent
        }
    ]
};
