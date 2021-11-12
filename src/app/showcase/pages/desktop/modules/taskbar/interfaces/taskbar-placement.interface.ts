import { DynamicWindowConfig, ResizerConfig } from 'ngx-os';
import { TaskbarPlacementEnum } from '../enums';

export interface TaskbarPlacement {
    id: TaskbarPlacementEnum;
    name: string;
    cssClassName: string;
    windowConfigFullscreenOffsetKey: keyof DynamicWindowConfig['fullscreenOffset'];
    targetSizeProperty: keyof HTMLElement;
    resizerConfig: ResizerConfig;
}
