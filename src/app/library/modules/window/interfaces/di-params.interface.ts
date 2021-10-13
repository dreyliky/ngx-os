import { Injector } from '@angular/core';
import { DynamicWindowRefModel } from '../classes';
import { DynamicWindowConfig } from './config.interface';

/** @internal */
export interface DynamicWindowDiParams {
    injector: Injector;
    config: DynamicWindowConfig;
    windowRef: DynamicWindowRefModel;
}
