import { Component, ComponentRef, Input, OnDestroy, Type } from '@angular/core';
import {
    ɵCacheableReturnInstance,
    ɵCssClasslistToObjectHelper,
    ɵOsBaseViewComponent,
    ɵWhenViewInit
} from '../../../../core';
import { DragStrategyByAxisProperties } from '../../../drag-and-drop';
import { ɵDynamicStateManager, ɵDynamicWindowRefModel } from '../../classes';
import {
    ɵDynamicStateEnum,
    ɵDynamicWindowCssClassEnum as CssClass,
    ɵDynamicWindowCssVariableEnum as CssVariable
} from '../../enums';
import { DynamicWindowConfig } from '../../interfaces';

/** @internal */
@Component({
    template: ''
})
export abstract class BaseDynamicWindowComponent extends ɵOsBaseViewComponent implements OnDestroy {
    @Input()
    public childComponentType: Type<any>;

    @Input()
    public windowRef: ɵDynamicWindowRefModel;

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

    public get _titleBarDisplayAttr(): string {
        return (this.config.isTitleBarVisible) ? '' : 'none';
    }

    @ɵCacheableReturnInstance
    public get windowStyle(): object {
        return {
            [CssVariable.Left]: `${this.config.positionX}px`,
            [CssVariable.Top]: `${this.config.positionY}px`,
            [CssVariable.RealWidth]: `${this.windowElement?.offsetWidth}px`,
            [CssVariable.RealHeight]: `${this.windowElement?.offsetHeight}px`,
            [CssVariable.CoordinateForHidingX]: this.config.hidesInto?.x,
            [CssVariable.CoordinateForHidingY]: this.config.hidesInto?.y,
            [CssVariable.FullscreenOffsetTop]: this.config.fullscreenOffset?.top,
            [CssVariable.FullscreenOffsetRight]: this.config.fullscreenOffset?.right,
            [CssVariable.FullscreenOffsetBottom]: this.config.fullscreenOffset?.bottom,
            [CssVariable.FullscreenOffsetLeft]: this.config.fullscreenOffset?.left,
            'z-index': this.zIndex,
            ...this.config.style
        };
    }

    @ɵCacheableReturnInstance
    public get windowStyleClass(): object {
        return {
            ...ɵCssClasslistToObjectHelper.transform(this.config.styleClass),
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

    @ɵWhenViewInit()
    @ɵCacheableReturnInstance
    public get draggerConfig(): object {
        return {
            draggableElement: this.titleBarElement,
            movableElement: this.windowElement,
            childElementsBlackList: this.titleBarButtons,
            strategy: this.draggerStrategy,
            ...this.config.draggerConfig
        };
    }

    @ɵWhenViewInit()
    @ɵCacheableReturnInstance
    public get resizerConfig(): object {
        return {
            targetElement: this.windowElement,
            minWidth: this.config.minWidth,
            minHeight: this.config.minHeight,
            maxWidth: this.config.maxWidth,
            maxHeight: this.config.maxHeight,
            allowedResizers: this.config.allowedResizers,
            xAxisLeftStyleProperty: CssVariable.Left,
            yAxisTopStyleProperty: CssVariable.Top,
            widthStyleProperty: CssVariable.Width,
            heightStyleProperty: CssVariable.Height,
            ...this.config.resizerConfig
        };
    }

    public config: DynamicWindowConfig;

    public zIndex: number;
    public windowOrderIndex: number = 0;

    public windowElement: HTMLElement;
    public titleBarElement: HTMLElement;
    public titleBarButtons: HTMLElement[] = [];

    protected readonly dynamicStateManager = new ɵDynamicStateManager();
    protected readonly baseZIndex: number = 1000;
    protected readonly alwaysOnTopBaseZIndex: number = 5000;

    protected childComponentRef: ComponentRef<any>;
    protected widthAtWindowedMode: number;
    protected heightAtWindowedMode: number;

    private readonly draggerStrategy = new DragStrategyByAxisProperties({
        xAxisLeftStyleProperty: CssVariable.Left,
        yAxisTopStyleProperty: CssVariable.Top
    });

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.childComponentRef?.destroy();
        this.windowRef.destroy();
    }

    protected updateZIndex(): void {
        this.zIndex = (this.baseZIndex + this.windowOrderIndex);

        if (this.config.isAlwaysOnTop) {
            this.zIndex += this.alwaysOnTopBaseZIndex;
        }
    }
}
