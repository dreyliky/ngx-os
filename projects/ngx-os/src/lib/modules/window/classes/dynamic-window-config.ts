import { ResizerEnum } from '../../resizer';
import { IDynamicWindowParams } from '../interfaces';

/** @internal */
export class DynamicWindowConfig<D = any, T = any> implements IDynamicWindowParams {
    public title?: string = 'OS dynamic window';
    public data?: D;
    public type?: T;
    public width?: number;
    public height?: number;
    public minWidth?: number = 275;
    public minHeight?: number = 175;
    public maxWidth?: number = Infinity;
    public maxHeight?: number = Infinity;
    public allowedResizers?: ResizerEnum[];
    public positionX?: number;
    public positionY?: number;
    public iconUrl?: string;
    public isFullscreenByDefault?: boolean = false;
    public isHiddenByDefault?: boolean = false;
    public isAllowHide?: boolean = true;
    public isAllowFullscreen?: boolean = true;
    public isAllowClose?: boolean = true;
    public isAlwaysOnTop?: boolean = false;
    public isToggleFullscreenByDblClickOnTitleBar?: boolean = true;
    public isExitFullscreenByDragTitleBar?: boolean = true;
    public isTitleBarVisible?: boolean = true;
    public style?: object = {};
    public styleClass?: string | string[] | object = '';
    public titleBarStyle: object = {};
    public titleBarStyleClass: string | string[] | object = '';
    public scrollViewStyle?: object = {};
    public scrollViewStyleClass?: string | string[] | object = '';
    public onMinimizeButtonClick?: () => void;
    public onMaximizeButtonClick?: () => void;
    public onCloseButtonClick?: () => void;

    constructor(params: IDynamicWindowParams) {
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
