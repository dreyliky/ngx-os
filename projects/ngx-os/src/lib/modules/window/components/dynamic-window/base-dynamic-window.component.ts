import { Component, ComponentRef, Input, OnDestroy, Type } from '@angular/core';
import { CssClasslistToObjectHelper as ClasslistToObject } from '@lib-core';
import { Subscription } from 'rxjs';
import { DraggerConfig, DragStrategyEnum } from '../../../drag-and-drop';
import { ResizerConfig } from '../../../resizer';
import { DynamicStateManager, DynamicWindowRef } from '../../classes';
import { DynamicStateEnum, DynamicWindowCssVariableEnum as CssVariable } from '../../enums';
import { IDynamicWindowParams } from '../../interfaces';

@Component({
    template: ''
})
export abstract class BaseDynamicWindowComponent implements OnDestroy {
    @Input()
    public childComponentType: Type<any>;

    @Input()
    public windowRef: DynamicWindowRef;

    public config: IDynamicWindowParams;

    public zIndex: number;
    public isDragging: boolean = false;
    public isResizing: boolean = false;
    public windowOrderIndex: number = 0;

    public windowElement: HTMLElement;
    public titleBarElement: HTMLDivElement;
    public titleBarButtons: HTMLButtonElement[] = [];

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

    public get draggableDirectiveConfig(): DraggerConfig {
        return {
            draggableElement: this.titleBarElement,
            movableElement: this.windowElement,
            childElementsBlackList: this.titleBarButtons,
            isAllowMoveElement: this.isAllowDragging,
            xAxisStyleProperty: CssVariable.Left,
            yAxisStyleProperty: CssVariable.Top,
            strategy: DragStrategyEnum.ByAxisProperties
        };
    }

    public get resizableDirectiveConfig(): ResizerConfig {
        return {
            targetElement: this.windowElement,
            minWidth: this.config.minWidth,
            minHeight: this.config.minHeight,
            maxWidth: this.config.maxWidth,
            maxHeight: this.config.maxHeight,
            allowedResizers: this.config.allowedResizers,
            isEnabled: this.isAllowResizing,
            xAxisLeftStyleProperty: CssVariable.Left,
            yAxisTopStyleProperty: CssVariable.Top,
            widthStyleProperty: CssVariable.Width,
            heightStyleProperty: CssVariable.Height
        };
    }

    public get windowStyleClass(): object {
        return {
            ...ClasslistToObject.transform(this.config.styleClass),
            'os-opening': this.isOpening,
            'os-hiding': this.isHiding,
            'os-showing': this.isShowing,
            'os-closing': this.isClosing,
            'os-entering-fullscreen': this.isEnteringFullscreen,
            'os-entering-windowed': this.isEnteringWindowed,
            'os-hidden': this.isHidden,
            'os-fullscreen': this.isFullscreen,
            'os-windowed': this.isWindowed,
            'os-dragging': this.isDragging,
            'os-resizing': this.isResizing
        };
    }

    public get windowStyle(): object {
        return {
            ...this.config.style,
            [CssVariable.Left]: `${this.config.positionX}px`,
            [CssVariable.Top]: `${this.config.positionY}px`,
            [CssVariable.RealWidth]: `${this.windowElement?.offsetWidth}px`,
            [CssVariable.RealHeight]: `${this.windowElement?.offsetHeight}px`,
            '--os-coordinate-x-for-hiding': this.config.hidesInto?.x,
            '--os-coordinate-y-for-hiding': this.config.hidesInto?.y,
            '--os-fullscreen-offset-top': this.config.fullscreenOffset?.top,
            '--os-fullscreen-offset-right': this.config.fullscreenOffset?.right,
            '--os-fullscreen-offset-bottom': this.config.fullscreenOffset?.bottom,
            '--os-fullscreen-offset-left': this.config.fullscreenOffset?.left
        };
    }

    protected readonly baseZIndex: number = 1000;
    protected readonly alwaysOnTopBaseZIndex: number = 5000;
    protected readonly cssAnimationClassDuration: number = 1000;

    protected childComponentRef: ComponentRef<any>;

    protected widthAtWindowedMode: number;
    protected heightAtWindowedMode: number;

    protected isAfterExitFullscreenByDragging: boolean = false;

    protected readonly parentSubscription = new Subscription();

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
