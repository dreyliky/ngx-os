import { Injector } from '@angular/core';
import { DynamicWindowRef } from '../classes';
import { IDynamicWindowParams } from './dynamic-window-params.interface';

export interface DynamicWindowDiParams {
    injector: Injector;
    config: IDynamicWindowParams;
    windowRef: DynamicWindowRef;
}
