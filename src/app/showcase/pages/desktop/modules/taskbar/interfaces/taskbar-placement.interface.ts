import { IDynamicWindowConfig, IResizerConfig } from 'ngx-os/modules';
import { TaskbarPlacementEnum } from '../enums';

export interface TaskbarPlacement {
    id: TaskbarPlacementEnum;
    name: string;
    cssClassName: string;
    windowConfigFullscreenOffsetKey: keyof IDynamicWindowConfig['fullscreenOffset'];
    targetSizeProperty: keyof HTMLElement;
    resizerConfig: IResizerConfig;
}
