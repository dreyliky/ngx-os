import { Component, ComponentRef, Input, OnDestroy, Type } from '@angular/core';
import { CssClasslistToObjectHelper as ClasslistToObject } from '../../../../core';
import { DragStrategyByAxisProperties, IDraggerConfig } from '../../../drag-and-drop';
import { IResizerParams } from '../../../resizer';
import { DynamicStateManager, DynamicWindowRef } from '../../classes';
import {
    DynamicStateEnum,
    DynamicWindowCssClassEnum as CssClass,
    DynamicWindowCssVariableEnum as CssVariable
} from '../../enums';
import { IDynamicWindowConfig } from '../../interfaces';

@Component({
    template: ''
})
export abstract class BaseDynamicWindowComponent implements OnDestroy {
    @Input()
    public childComponentType: Type<any>;

    @Input()
    public windowRef: DynamicWindowRef;

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

    public get _titleBarDisplayAttr(): string {
        return (this.config.isTitleBarVisible) ? '' : 'none';
    }

    public get windowStyle(): object {
        return {
            ...this.config.style,
            [CssVariable.Left]: `${this.config.positionX}px`,
            [CssVariable.Top]: `${this.config.positionY}px`,
            [CssVariable.RealWidth]: `${this.windowElement?.offsetWidth}px`,
            [CssVariable.RealHeight]: `${this.windowElement?.offsetHeight}px`,
            [CssVariable.CoordinateForHidingX]: this.config.hidesInto?.x,
            [CssVariable.CoordinateForHidingY]: this.config.hidesInto?.y,
            [CssVariable.FullscreenOffsetTop]: this.config.fullscreenOffset?.top,
            [CssVariable.FullscreenOffsetRight]: this.config.fullscreenOffset?.right,
            [CssVariable.FullscreenOffsetBottom]: this.config.fullscreenOffset?.bottom,
            [CssVariable.FullscreenOffsetLeft]: this.config.fullscreenOffset?.left
        };
    }

    public get windowStyleClass(): object {
        return {
            ...ClasslistToObject.transform(this.config.styleClass),
            [CssClass.Opening]: this.isOpening,
            [CssClass.Hiding]: this.isHiding,
            [CssClass.Showing]: this.isShowing,
            [CssClass.Closing]: this.isClosing,
            [CssClass.EnteringFullscreen]: this.isEnteringFullscreen,
            [CssClass.EnteringWindowed]: this.isEnteringWindowed,
            [CssClass.Hidden]: this.isHidden,
            [CssClass.Fullscreen]: this.isFullscreen,
            [CssClass.Windowed]: this.isWindowed
        };
    }

    public isViewInitialized: boolean = false;

    public config: IDynamicWindowConfig;
    public draggerConfig: IDraggerConfig;
    public resizerConfig: IResizerParams;

    public zIndex: number;
    public windowOrderIndex: number = 0;

    public windowElement: HTMLElement;
    public titleBarElement: HTMLDivElement;
    public titleBarButtons: HTMLButtonElement[] = [];

    protected readonly dynamicStateManager = new DynamicStateManager();
    protected readonly baseZIndex: number = 1000;
    protected readonly alwaysOnTopBaseZIndex: number = 5000;
    protected readonly cssAnimationClassDuration: number = 1000;

    protected childComponentRef: ComponentRef<any>;

    protected widthAtWindowedMode: number;
    protected heightAtWindowedMode: number;

    protected isAfterExitFullscreenByDragging: boolean = false;

    private readonly draggerStrategy = new DragStrategyByAxisProperties({
        xAxisLeftStyleProperty: CssVariable.Left,
        yAxisTopStyleProperty: CssVariable.Top
    });

    public ngOnDestroy(): void {
        this.childComponentRef?.destroy();
        this.windowRef.destroy();
    }

    protected updateZIndex(): void {
        this.zIndex = (this.baseZIndex + this.windowOrderIndex);

        if (this.config.isAlwaysOnTop) {
            this.zIndex += this.alwaysOnTopBaseZIndex;
        }
    }

    protected updateComplexStructures(): void {
        if (this.isViewInitialized) {
            this.updateDraggerConfig();
            this.updateResizerConfig();
        }
    }

    protected updateDraggerConfig(): void {
        this.draggerConfig = {
            draggableElement: this.titleBarElement,
            movableElement: this.windowElement,
            childElementsBlackList: this.titleBarButtons,
            strategy: this.draggerStrategy
        };
    }

    protected updateResizerConfig(): void {
        this.resizerConfig = {
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
}
