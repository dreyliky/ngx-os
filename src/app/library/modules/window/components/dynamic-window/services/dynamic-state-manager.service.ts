import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, skip } from 'rxjs';
import { ɵDynamicWindowRefModel } from '../../../classes';
import { DYNAMIC_WINDOW_REF } from '../../../data';
import { ɵDynamicStateEnum } from '../../../enums';

/** @internal */
@Injectable()
export class ɵDynamicStateManager {
    public get state$(): Observable<ɵDynamicStateEnum | null> {
        return this._state$.asObservable();
    }

    public get state(): ɵDynamicStateEnum | null {
        return this._state$.getValue();
    }

    private readonly _state$ = new BehaviorSubject<ɵDynamicStateEnum | null>(null);

    private currentStateTimeoutId: number;
    private readonly cssAnimationClassDuration: number = 500;

    constructor(
        @Inject(DYNAMIC_WINDOW_REF) public readonly windowRef: ɵDynamicWindowRefModel
    ) {
        this.apply(ɵDynamicStateEnum.Opening);
        this.initIsHiddenStateObserver();
        this.initIsFullscreenStateObserver();
        this.initBeforeHiddenStateObserver();
        this.initAfterClosedStateObserver();
    }

    public is(state: ɵDynamicStateEnum): boolean {
        return (state === this.state);
    }

    public apply(state: ɵDynamicStateEnum): void {
        if (this.state === state) {
            return;
        }

        clearTimeout(this.currentStateTimeoutId);

        this._state$.next(state);

        this.currentStateTimeoutId = window.setTimeout(() => {
            this._state$.next(null);
        }, this.cssAnimationClassDuration);
    }

    private initIsHiddenStateObserver(): void {
        this.windowRef.isHidden$
            .pipe(
                skip(1),
                filter((isHidden) => !isHidden)
            )
            .subscribe(() => this.apply(ɵDynamicStateEnum.Showing));
    }

    private initIsFullscreenStateObserver(): void {
        this.windowRef.isFullscreen$
            .pipe(
                skip(1),
                map((state) => (
                    (state) ?
                        ɵDynamicStateEnum.EnteringFullscreen :
                        ɵDynamicStateEnum.EnteringWindowed
                ))
            )
            .subscribe((dynamicState) => this.apply(dynamicState));
    }

    private initBeforeHiddenStateObserver(): void {
        this.windowRef.beforeHidden$
            .subscribe(() => this.apply(ɵDynamicStateEnum.Hiding));
    }

    private initAfterClosedStateObserver(): void {
        this.windowRef.afterClosed$
            .subscribe(() => this.apply(ɵDynamicStateEnum.Closing));
    }
}
