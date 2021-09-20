import { Component, ComponentRef, Input, OnDestroy, OnInit, Type } from '@angular/core';
import { Subscription } from 'rxjs';
import { DynamicStateManager, DynamicWindowRef } from '../../classes';
import { DynamicStateEnum } from '../../enums';
import { IDynamicWindowParams } from '../../interfaces';

@Component({
    template: ''
})
export abstract class BaseDynamicWindowComponent implements OnInit, OnDestroy {
    @Input()
    public childComponentType: Type<any>;

    @Input()
    public config: IDynamicWindowParams;

    @Input()
    public windowRef: DynamicWindowRef;

    public width: string;
    public height: string;
    public zIndex: number;
    public isDragging: boolean = false;
    public isResizing: boolean = false;
    public windowOrderIndex: number = 0;

    public windowElement: HTMLElement;
    public titleBarElement: HTMLDivElement;
    public titleBarButtons: HTMLButtonElement[] = [];

    public readonly dynamicStateEnum = DynamicStateEnum;
    public readonly dynamicStateManager = new DynamicStateManager();

    public get isOpening(): boolean {
        return this.dynamicStateManager.is(DynamicStateEnum.Opening);
    }

    public get isHiding(): boolean {
        return this.dynamicStateManager.is(DynamicStateEnum.Hiding);
    }

    public get isShowing(): boolean {
        return this.dynamicStateManager.is(DynamicStateEnum.Showing);
    }

    public get isClosing(): boolean {
        return this.dynamicStateManager.is(DynamicStateEnum.Closing);
    }

    public get isEnteringFullscreen(): boolean {
        return this.dynamicStateManager.is(DynamicStateEnum.EnteringFullscreen);
    }

    public get isEnteringWindowed(): boolean {
        return this.dynamicStateManager.is(DynamicStateEnum.EnteringWindowed);
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

    public get isAllowResizing(): boolean {
        return !this.windowRef.isFullscreen;
    }

    public get isAllowDragging(): boolean {
        return !this.windowRef.isFullscreen;
    }

    public get positionX(): string {
        return `${this.config.positionX}px`;
    }

    public get positionY(): string {
        return `${this.config.positionY}px`;
    }

    protected readonly baseZIndex: number = 1000;
    protected readonly alwaysOnTopBaseZIndex: number = 5000;
    protected readonly cssAnimationClassDuration: number = 1000;

    protected childComponentRef: ComponentRef<any>;

    protected widthAtWindowedMode: number;
    protected heightAtWindowedMode: number;

    protected isAfterExitFullscreenByDragging: boolean = false;

    protected readonly parentSubscription = new Subscription();

    public ngOnInit(): void {
        // FIXME: Not the component's logic
        this.windowRef.setIsHiddenState(this.config.isHidden);
        this.windowRef.setIsFullscreenState(this.config.isFullscreen);
    }

    public ngOnDestroy(): void {
        this.childComponentRef?.destroy();
        this.parentSubscription.unsubscribe();
        this.windowRef.destroy();
    }

    protected updateZIndex(): void {
        this.zIndex = (this.baseZIndex + this.windowOrderIndex);

        if (this.config.isAlwaysOnTop) {
            this.zIndex += this.alwaysOnTopBaseZIndex;
        }
    }
}
