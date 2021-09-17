import { Component, ComponentRef, OnDestroy, OnInit, Type } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResizerEnum } from '../../../resizer';
import { DynamicStateManager, DynamicWindowRef } from '../../classes';
import { DynamicStateEnum } from '../../enums';
import { IDynamicWindowParams } from '../../interfaces';

@Component({
    template: ''
})
export abstract class BaseDynamicWindowComponent implements OnInit, OnDestroy {
    public childComponentType: Type<any>;
    public config: IDynamicWindowParams;
    public windowRef: DynamicWindowRef;

    public width: string;
    public height: string;
    public allowedResizers: ResizerEnum[];
    public zIndex: number;
    public styleObject: object;
    public isDragging: boolean = false;
    public isResizing: boolean = false;
    public windowOrderIndex: number = 0;

    public windowElement: HTMLElement;
    public titleBarElement: HTMLDivElement;
    public titleBarButtons: HTMLButtonElement[] = [];

    public readonly dynamicStateEnum = DynamicStateEnum;
    public readonly dynamicStateManager = new DynamicStateManager();

    public get isHidden(): boolean {
        return (
            this.windowRef.isHidden &&
            !this.dynamicStateManager.is(DynamicStateEnum.Hiding)
        );
    }

    public get isFullscreen(): boolean {
        return (
            this.windowRef.isFullscreen &&
            !this.dynamicStateManager.is(DynamicStateEnum.EnteringFullscreen)
        );
    }

    public get isWindowed(): boolean {
        return (
            !this.windowRef.isFullscreen &&
            !this.dynamicStateManager.is(DynamicStateEnum.EnteringWindowed)
        );
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
    protected readonly alwaysOnTopZIndex: number = 5000;
    protected readonly cssAnimationClassDuration: number = 1000;

    protected childComponentRef: ComponentRef<any>;

    protected widthAtWindowedMode: number;
    protected heightAtWindowedMode: number;

    protected isAfterExitFullscreenByDragging: boolean = false;

    protected readonly parentSubscription = new Subscription();

    public ngOnInit(): void {
        this.windowRef.setIsHiddenState(this.config.isHidden);
        this.windowRef.setIsFullscreenState(this.config.isFullscreen);
    }

    public ngOnDestroy(): void {
        this.childComponentRef?.destroy();
        this.parentSubscription.unsubscribe();
        this.windowRef.destroy();
    }
}
