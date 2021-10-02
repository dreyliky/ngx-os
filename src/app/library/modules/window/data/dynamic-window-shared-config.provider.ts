import { Provider } from '@angular/core';
import { DynamicWindowSharedConfigService } from '../services/shared-config.service';
import { DYNAMIC_WINDOW_SHARED_CONFIG } from './shared-dynamic-window-config.token';

/** @internal */
export const DYNAMIC_WINDOW_SHARED_CONFIG_PROVIDER: Provider = {
    provide: DYNAMIC_WINDOW_SHARED_CONFIG,
    useFactory: (service: DynamicWindowSharedConfigService) => service.data$,
    deps: [DynamicWindowSharedConfigService]
};
