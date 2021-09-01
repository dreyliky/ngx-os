import { GridComponent, GridModule } from '@lib-modules';
import { GridOverviewComponent } from '../../demo';
import { OsComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const GRID_META_INFO: ComponentMetaInfo = {
    name: 'Grid',
    type: OsComponentEnum.Grid,
    shortInfo: 'Grid component short info',
    imageUrl: '/assets/icons/components/grid.png',
    libModules: [
        GridModule
    ],
    libComponents: [
        GridComponent
    ],
    libInterfaces: [
        'GridItem'
    ],
    libTypes: [
        'GridViewType'
    ],
    demoComponents: [
        {
            title: 'Grid Overview',
            component: GridOverviewComponent
        }
    ]
};
