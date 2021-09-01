import { GridComponent, GridModule } from '@lib-modules';
import { GridOverviewComponent } from '../../demo';
import { ComponentEnum } from '../../enums';
import { ComponentMetaInfo } from '../../interfaces';

export const GRID_META_INFO: ComponentMetaInfo = {
    name: 'Grid',
    type: ComponentEnum.Grid,
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
