import { Component, ComponentRef, OnDestroy, OnInit, Type } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResizerEnum } from '../../../resizer';
import { DynamicStateManager, DynamicWindowRef } from '../../classes';
import { DynamicStateEnum } from '../../enums';
import { DynamicWindowParams } from '../../interfaces';

@Component({
    template: ''
})
export abstract class BaseDynamicWindowComponent implements OnInit, OnDestroy {
    public childComponentType: Type<any>;
    public config: DynamicWindowParams;
    public windowRef: DynamicWindowRef;

    public width: string;
    public height: string;
    public allowedResizers: ResizerEnum[];
    public positionX: string;
    public positionY: string;
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
        return (this.windowRef.isHidden && !this.dynamicStateManager.isHiding);
    }

    public get isAllowResizing(): boolean {
        return !this.windowRef.isFullscreen;
    }

    public get isAllowDragging(): boolean {
        return !this.windowRef.isFullscreen;
    }

    protected readonly baseZIndex: number = 1000;
    protected readonly alwaysOnTopZIndex: number = 5000;
    protected readonly cssAnimationClassDuration: number = 1000;

    protected childComponentRef: ComponentRef<any>;

    protected widthAtWindowedMode: number;
    protected heightAtWindowedMode: number;

    protected isAfterExitFullscreenByDragging: boolean = false;

    protected readonly subscriptions: Subscription[] = [];

    public ngOnInit(): void {
        this.positionX = `${this.config.positionX}px`;
        this.positionY = `${this.config.positionY}px`;

        this.windowRef.setIsHiddenState(this.config.isHidden);
        this.windowRef.setIsFullscreenState(this.config.isFullscreen);
    }

    public ngOnDestroy(): void {
        if (this.childComponentRef) {
            this.childComponentRef.destroy();
        }

        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });

        this.windowRef.destroy();
    }
}
