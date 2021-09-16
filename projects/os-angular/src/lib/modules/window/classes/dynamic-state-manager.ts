import { DynamicStateEnum } from '../enums';

export class DynamicStateManager {
    public get state(): DynamicStateEnum {
        return this._state;
    }

    public get isOpening(): boolean {
        return (this._state === DynamicStateEnum.Opening);
    }

    public get isHiding(): boolean {
        return (this._state === DynamicStateEnum.Hiding);
    }

    public get isShowing(): boolean {
        return (this._state === DynamicStateEnum.Showing);
    }

    public get isEnteringFullscreen(): boolean {
        return (this._state === DynamicStateEnum.EnteringFullscreen);
    }

    public get isEnteringWindowed(): boolean {
        return (this._state === DynamicStateEnum.EnteringWindowed);
    }

    public get isClosing(): boolean {
        return (this._state === DynamicStateEnum.Closing);
    }

    private _state: DynamicStateEnum;

    private callback: () => any;
    private currentStateTimeoutId: number;
    private readonly cssAnimationClassDuration: number = 500;

    public apply(state: DynamicStateEnum): void {
        this.clearCurrentTimeout();

        this._state = state;

        this.currentStateTimeoutId = setTimeout(() => {
            this._state = null;

            this.callback?.();
        }, this.cssAnimationClassDuration);
    }

    public registerCallback(callback: () => any): void {
        this.callback = callback;
    }

    private clearCurrentTimeout(): void {
        if (this.currentStateTimeoutId) {
            clearTimeout(this.currentStateTimeoutId);

            this.currentStateTimeoutId = null;
        }
    }
}
