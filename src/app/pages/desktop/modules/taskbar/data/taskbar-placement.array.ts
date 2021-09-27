import { ResizerEnum } from '@lib-modules';
import { TaskbarPlacementEnum } from '../enums';
import { TaskbarPlacement } from '../interfaces';

export const TASKBAR_PLACEMENT_ARRAY: TaskbarPlacement[] = [
    {
        id: TaskbarPlacementEnum.Bottom,
        name: 'Bottom',
        cssClassName: 'taskbar-bottom',
        windowConfigFullscreenOffsetKey: 'bottom',
        targetSizeProperty: 'offsetHeight',
        resizerConfig: {
            allowedResizers: [ResizerEnum.top],
            heightStyleProperty: 'min-height'
        }
    },
    {
        id: TaskbarPlacementEnum.Top,
        name: 'Top',
        cssClassName: 'taskbar-top',
        windowConfigFullscreenOffsetKey: 'top',
        targetSizeProperty: 'offsetHeight',
        resizerConfig: {
            allowedResizers: [ResizerEnum.bottom],
            heightStyleProperty: 'min-height'
        }
    },
    {
        id: TaskbarPlacementEnum.Left,
        name: 'Left',
        cssClassName: 'taskbar-left',
        windowConfigFullscreenOffsetKey: 'left',
        targetSizeProperty: 'offsetWidth',
        resizerConfig: {
            allowedResizers: [ResizerEnum.right],
            heightStyleProperty: 'min-width'
        }
    },
    {
        id: TaskbarPlacementEnum.Right,
        name: 'Right',
        cssClassName: 'taskbar-right',
        windowConfigFullscreenOffsetKey: 'right',
        targetSizeProperty: 'offsetWidth',
        resizerConfig: {
            allowedResizers: [ResizerEnum.left],
            heightStyleProperty: 'min-width'
        }
    }
];
