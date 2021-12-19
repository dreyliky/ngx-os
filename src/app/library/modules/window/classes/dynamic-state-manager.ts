import { ɵDynamicStateEnum } from '../enums';

/** @internal */
export class ɵDynamicStateManager {
    public get state(): ɵDynamicStateEnum {
        return this._state;
    }

    private _state: ɵDynamicStateEnum;

    private afterStartCallback: () => void;
    private afterEndCallback: () => void;
    private currentStateTimeoutId: number;
    private readonly cssAnimationClassDuration: number = 500;

    public is(state: ɵDynamicStateEnum): boolean {
        return (state === this._state);
    }

    public apply(state: ɵDynamicStateEnum): void {
        if (this.state === state) {
            return;
        }

        clearTimeout(this.currentStateTimeoutId);

        this._state = state;

        this.currentStateTimeoutId = window.setTimeout(() => {
            this._state = null;

            this.afterEndCallback?.();
        }, this.cssAnimationClassDuration);

        this.afterStartCallback?.();
    }

    public registerAfterStartCallback(callback: () => void): void {
        this.afterStartCallback = callback;
    }

    public registerAfterEndCallback(callback: () => void): void {
        this.afterEndCallback = callback;
    }
}
