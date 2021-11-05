import { Type } from '@angular/core';
import { DraggerConfig } from '../../drag-and-drop';
import { ResizerConfig, ResizerEnum } from '../../resizer';
import { DynamicWindowConfig, DynamicWindowFullscreenOffset } from '../interfaces';

/** @internal */
export class DynamicWindowConfigModel<D = any, T = any> implements DynamicWindowConfig {
    public title?: string;
    public data?: D;
    public type?: T;
    public titleBarCustomContent?: Type<any>;
    public width?: number;
    public height?: number;
    public minWidth?: number;
    public minHeight?: number;
    public maxWidth?: number;
    public maxHeight?: number;
    public allowedResizers?: ResizerEnum[];
    public positionX?: number;
    public positionY?: number;
    public iconUrl?: string;
    public fullscreenOffset?: DynamicWindowFullscreenOffset;
    public isFullscreenByDefault?: boolean;
    public isHiddenByDefault?: boolean;
    public isAllowHide?: boolean;
    public isAllowFullscreen?: boolean;
    public isAllowClose?: boolean;
    public isAlwaysOnTop?: boolean;
    public isToggleFullscreenByDblClickOnTitleBar?: boolean;
    public isExitFullscreenByDragTitleBar?: boolean;
    public isTitleBarVisible?: boolean;
    public style?: object;
    public styleClass?: string | string[] | object;
    public titleBarStyle: object;
    public titleBarStyleClass: string | string[] | object;
    public scrollViewStyle?: object;
    public scrollViewStyleClass?: string | string[] | object;
    public draggerConfig?: DraggerConfig = {};
    public resizerConfig?: ResizerConfig = {};

    constructor(params: DynamicWindowConfig = {}) {
        Object.assign(this, params);
        this.initWidth(params);
        this.initHeight(params);
    }

    private initWidth(params: DynamicWindowConfig): void {
        if (params.minWidth && !params.width) {
            this.width = params.minWidth;
        }
    }

    private initHeight(params: DynamicWindowConfig): void {
        if (params.minHeight && !params.height) {
            this.height = params.minHeight;
        }
    }
}
