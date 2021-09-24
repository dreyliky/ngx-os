import { TaskbarPlacementEnum } from '../enums';
import { TaskbarPlacement } from '../interfaces';

export const TASKBAR_PLACEMENT_ARRAY: TaskbarPlacement[] = [
    {
        id: TaskbarPlacementEnum.Bottom,
        name: 'Bottom',
        cssClassName: 'taskbar-bottom'
    },
    {
        id: TaskbarPlacementEnum.Top,
        name: 'Top',
        cssClassName: 'taskbar-top'
    },
    {
        id: TaskbarPlacementEnum.Left,
        name: 'Left',
        cssClassName: 'taskbar-left'
    },
    {
        id: TaskbarPlacementEnum.Right,
        name: 'Right',
        cssClassName: 'taskbar-right'
    }
];
