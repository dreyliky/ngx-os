import { IDynamicWindowParams, IResizerParams } from 'ngx-os/modules';
import { TaskbarPlacementEnum } from '../enums';

export interface TaskbarPlacement {
    id: TaskbarPlacementEnum;
    name: string;
    cssClassName: string;
    windowConfigFullscreenOffsetKey: keyof IDynamicWindowParams['fullscreenOffset'];
    targetSizeProperty: keyof HTMLElement;
    resizerConfig: IResizerParams;
}
