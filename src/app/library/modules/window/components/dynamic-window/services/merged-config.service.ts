import { Inject, Injectable } from '@angular/core';
import { Observable, combineLatest, map, shareReplay } from 'rxjs';
import { ɵDynamicWindowRefModel } from '../../../classes/dynamic-window-ref';
import { DYNAMIC_WINDOW_REF } from '../../../data/dynamic-window-ref.token';
import {
    DYNAMIC_WINDOW_SHARED_CONFIG as SHARED_CONFIG
} from '../../../data/shared-dynamic-window-config.token';
import { ɵMergeConfigs } from '../../../helpers/configs-merger.helper';
import type { DynamicWindowConfig } from '../../../interfaces/config.interface';

/** @internal */
@Injectable()
export class ɵMergedConfigService {
    public readonly data$ = combineLatest([
        this.sharedConfig$,
        this.windowRef.config$
    ])
        .pipe(
            map(([sharedConfig, windowConfig]) => ɵMergeConfigs(windowConfig, sharedConfig)),
            shareReplay(1)
        );

    constructor(
        @Inject(SHARED_CONFIG) private readonly sharedConfig$: Observable<DynamicWindowConfig>,
        @Inject(DYNAMIC_WINDOW_REF) private readonly windowRef: ɵDynamicWindowRefModel
    ) {}
}
