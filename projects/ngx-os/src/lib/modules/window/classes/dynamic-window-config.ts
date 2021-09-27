import { ResizerEnum } from '../../resizer';
import { IDynamicWindowFullscreenOffset, IDynamicWindowParams } from '../interfaces';

/** @internal */
export class DynamicWindowConfig<D = any, T = any> implements IDynamicWindowParams {
    public title?: string;
    public data?: D;
    public type?: T;
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
    public fullscreenOffset: IDynamicWindowFullscreenOffset;

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
    public onMinimizeButtonClick?: () => void;
    public onMaximizeButtonClick?: () => void;
    public onCloseButtonClick?: () => void;

    constructor(params: IDynamicWindowParams = {}) {
        Object.assign(this, params);
        this.initWidth(params);
        this.initHeight(params);
    }

    private initWidth(params: IDynamicWindowParams): void {
        if (params.minWidth && !params.width) {
            this.width = params.minWidth;
        }
    }

    private initHeight(params: IDynamicWindowParams): void {
        if (params.minHeight && !params.height) {
            this.height = params.minHeight;
        }
    }
}
