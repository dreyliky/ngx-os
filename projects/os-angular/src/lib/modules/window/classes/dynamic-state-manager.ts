import { DynamicStateEnum } from '../enums';

/** Private class */
export class DynamicStateManager {
    public get state(): DynamicStateEnum {
        return this._state;
    }

    private _state: DynamicStateEnum;

    private callback: () => any;
    private currentStateTimeoutId: number;
    private readonly cssAnimationClassDuration: number = 500;

    public is(state: DynamicStateEnum): boolean {
        return (state === this._state);
    }

    public apply(state: DynamicStateEnum): void {
        clearTimeout(this.currentStateTimeoutId);

        this._state = state;

        this.currentStateTimeoutId = setTimeout(() => {
            this._state = null;

            this.callback?.();
        }, this.cssAnimationClassDuration);
    }

    public registerCallback(callback: () => any): void {
        this.callback = callback;
    }
}
