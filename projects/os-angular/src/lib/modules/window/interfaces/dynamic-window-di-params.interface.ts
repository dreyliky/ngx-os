import { Injector } from '@angular/core';
import { DynamicWindowRef } from '../classes';
import { DynamicWindowParams } from './dynamic-window-params.interface';

export interface DynamicWindowDiParams {
    injector: Injector;
    config: DynamicWindowParams;
    windowRef: DynamicWindowRef;
}
