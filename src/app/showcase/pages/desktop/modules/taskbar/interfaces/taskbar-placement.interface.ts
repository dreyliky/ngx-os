import { DynamicWindowConfigModel, ResizerConfigModel } from 'ngx-os/modules';
import { TaskbarPlacementEnum } from '../enums';

export interface TaskbarPlacement {
    id: TaskbarPlacementEnum;
    name: string;
    cssClassName: string;
    windowConfigFullscreenOffsetKey: keyof DynamicWindowConfigModel['fullscreenOffset'];
    targetSizeProperty: keyof HTMLElement;
    resizerConfig: ResizerConfigModel;
}
