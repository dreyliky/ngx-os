import { Component, ComponentRef, OnDestroy, OnInit, Type } from '@angular/core';
import { DynamicWindowParams } from '@lib-modules/window/interfaces';
import { Subscription } from 'rxjs';
import { ResizerEnum } from '../../../resizer';
import { DynamicWindowRef } from '../../classes';

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
    public isActive: boolean = false;
    public isFullscreen: boolean = false;
    public isHidden: boolean = false;
    public isHiding: boolean = false;
    public isOpening: boolean = true;
    public isShowing: boolean = false;
    public isDragging: boolean = false;
    public isResizing: boolean = false;
    public isClosing: boolean = false;
    public windowIdOrderIndex: number = 0;

    public isAllowResizing: boolean = true;
    public isAllowDragging: boolean = true;

    public windowElement: HTMLElement;
    public titleBarElement: HTMLDivElement;
    public titleBarButtons: HTMLButtonElement[] = [];

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
        this.isHidden = this.config.isHidden;

        this.windowRef.setFullscreenState(this.config.isFullscreen);
    }

    public ngOnDestroy(): void {
        if (this.childComponentRef) {
            this.childComponentRef.destroy();
        }

        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }
}
