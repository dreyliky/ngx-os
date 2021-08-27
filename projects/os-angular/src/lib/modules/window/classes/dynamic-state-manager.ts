import { DynamicWindowComponent } from '../components';
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

    public get isClosing(): boolean {
        return (this._state === DynamicStateEnum.Closing);
    }

    private _state: DynamicStateEnum;

    private callback: () => any;
    private currentStateTimeoutId: number;
    private readonly cssAnimationClassDuration: number = 500;

    constructor(
        private readonly window: DynamicWindowComponent
    ) {}

    public initOpeningState(): void {
        this.clearCurrentTimeout();

        this._state = DynamicStateEnum.Opening;

        this.currentStateTimeoutId = setTimeout(() => {
            this._state = null;

            this.callback?.();
        }, this.cssAnimationClassDuration);
    }

    public initHidingState(): void {
        this.clearCurrentTimeout();

        this.window.isHidden = false;
        this._state = DynamicStateEnum.Hiding;

        this.currentStateTimeoutId = setTimeout(() => {
            this.window.isHidden = true;
            this._state = null;

            this.callback?.();
        }, this.cssAnimationClassDuration);
    }

    public initShowingState(): void {
        this.clearCurrentTimeout();

        this.window.isHidden = false;
        this._state = DynamicStateEnum.Showing;

        this.currentStateTimeoutId = setTimeout(() => {
            this._state = null;

            this.callback?.();
        }, this.cssAnimationClassDuration);
    }

    public initClosingState(): void {
        this.clearCurrentTimeout();

        this._state = DynamicStateEnum.Closing;

        this.callback?.();
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
