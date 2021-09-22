import { Injector } from '@angular/core';
import { DynamicWindowRef } from '../classes';
import { IDynamicWindowParams } from './dynamic-window-params.interface';

export interface IDynamicWindowDiParams {
    injector: Injector;
    config: IDynamicWindowParams;
    windowRef: DynamicWindowRef;
}
