import { TaskbarPlacementEnum } from '../enums';
import { TaskbarPlacement } from '../interfaces';

export const TASKBAR_PLACEMENT_ARRAY: TaskbarPlacement[] = [
    {
        id: TaskbarPlacementEnum.Bottom,
        name: 'Bottom',
        cssClassName: 'taskbar-bottom',
        windowConfigFullscreenOffsetKey: 'bottom',
        targetSizeProperty: 'offsetHeight'
    },
    {
        id: TaskbarPlacementEnum.Top,
        name: 'Top',
        cssClassName: 'taskbar-top',
        windowConfigFullscreenOffsetKey: 'top',
        targetSizeProperty: 'offsetHeight'
    },
    {
        id: TaskbarPlacementEnum.Left,
        name: 'Left',
        cssClassName: 'taskbar-left',
        windowConfigFullscreenOffsetKey: 'left',
        targetSizeProperty: 'offsetWidth'
    },
    {
        id: TaskbarPlacementEnum.Right,
        name: 'Right',
        cssClassName: 'taskbar-right',
        windowConfigFullscreenOffsetKey: 'right',
        targetSizeProperty: 'offsetWidth'
    }
];
