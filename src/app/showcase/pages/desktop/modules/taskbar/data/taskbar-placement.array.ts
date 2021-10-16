import { ResizerEnum } from 'ngx-os';
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
            allowedResizers: [ResizerEnum.Top],
            isAllowChangePosition: false,
            heightStyleProperty: 'flex-basis'
        }
    },
    {
        id: TaskbarPlacementEnum.Top,
        name: 'Top',
        cssClassName: 'taskbar-top',
        windowConfigFullscreenOffsetKey: 'top',
        targetSizeProperty: 'offsetHeight',
        resizerConfig: {
            allowedResizers: [ResizerEnum.Bottom],
            isAllowChangePosition: false,
            heightStyleProperty: 'flex-basis'
        }
    },
    {
        id: TaskbarPlacementEnum.Left,
        name: 'Left',
        cssClassName: 'taskbar-left',
        windowConfigFullscreenOffsetKey: 'left',
        targetSizeProperty: 'offsetWidth',
        resizerConfig: {
            allowedResizers: [ResizerEnum.Right],
            isAllowChangePosition: false,
            widthStyleProperty: 'flex-basis'
        }
    },
    {
        id: TaskbarPlacementEnum.Right,
        name: 'Right',
        cssClassName: 'taskbar-right',
        windowConfigFullscreenOffsetKey: 'right',
        targetSizeProperty: 'offsetWidth',
        resizerConfig: {
            allowedResizers: [ResizerEnum.Left],
            isAllowChangePosition: false,
            widthStyleProperty: 'flex-basis'
        }
    }
];
