/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-empty-function */
import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/** @internal */
@Injectable()
export class ɵDestroyService extends Subject<boolean> implements OnDestroy {
    /** @deprecated */
    public override next(): void {}
    /** @deprecated */
    public override complete(): void {}

    public ngOnDestroy(): void {
        super.next(true);
        super.complete();
    }
}
