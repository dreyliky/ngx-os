import { Inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable, shareReplay } from 'rxjs';
import { ɵDynamicWindowRefModel } from '../../../classes';
import { DYNAMIC_WINDOW_REF, DYNAMIC_WINDOW_SHARED_CONFIG as SHARED_CONFIG } from '../../../data';
import { ɵMergeConfigs } from '../../../helpers';
import { DynamicWindowConfig } from '../../../interfaces';

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
