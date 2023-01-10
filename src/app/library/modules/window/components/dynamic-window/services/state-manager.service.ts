import { Inject, Injectable } from '@angular/core';
import { ɵDynamicWindowRefModel } from '../../../classes';
import { DYNAMIC_WINDOW_REF } from '../../../data';
import { ɵDynamicStateEnum } from '../../../enums';
import { ɵDynamicStateManager } from './dynamic-state-manager.service';

/** @internal */
@Injectable()
export class ɵStateManager {
    public get isOpening(): boolean {
        return this.dynamicStateManager.is(ɵDynamicStateEnum.Opening);
    }

    public get isHiding(): boolean {
        return this.dynamicStateManager.is(ɵDynamicStateEnum.Hiding);
    }

    public get isShowing(): boolean {
        return this.dynamicStateManager.is(ɵDynamicStateEnum.Showing);
    }

    public get isClosing(): boolean {
        return this.dynamicStateManager.is(ɵDynamicStateEnum.Closing);
    }

    public get isEnteringFullscreen(): boolean {
        return this.dynamicStateManager.is(ɵDynamicStateEnum.EnteringFullscreen);
    }

    public get isEnteringWindowed(): boolean {
        return this.dynamicStateManager.is(ɵDynamicStateEnum.EnteringWindowed);
    }

    public get isHidden(): boolean {
        return (this.windowRef.isHidden && !this.isHiding);
    }

    public get isFullscreen(): boolean {
        return (this.windowRef.isFullscreen && !this.isEnteringFullscreen);
    }

    public get isWindowed(): boolean {
        return (!this.windowRef.isFullscreen && !this.isEnteringWindowed);
    }

    constructor(
        @Inject(DYNAMIC_WINDOW_REF) public readonly windowRef: ɵDynamicWindowRefModel,
        private readonly dynamicStateManager: ɵDynamicStateManager
    ) {}
}
