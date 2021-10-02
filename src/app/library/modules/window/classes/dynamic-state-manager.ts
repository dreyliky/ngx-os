import { DynamicStateEnum } from '../enums';

/** @internal */
export class DynamicStateManager {
    public get state(): DynamicStateEnum {
        return this._state;
    }

    private _state: DynamicStateEnum;

    private afterStartCallback: () => void;
    private afterEndCallback: () => void;
    private currentStateTimeoutId: number;
    private readonly cssAnimationClassDuration: number = 500;

    public is(state: DynamicStateEnum): boolean {
        return (state === this._state);
    }

    public apply(state: DynamicStateEnum): void {
        if (this.state === state) {
            return;
        }

        clearTimeout(this.currentStateTimeoutId);

        this._state = state;

        this.currentStateTimeoutId = setTimeout(() => {
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
