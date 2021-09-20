import { ResizerEnum } from '../../resizer';
import { IDynamicWindowParams } from '../interfaces/dynamic-window-params.interface';

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
    public isFullscreen?: boolean = false;
    public isHidden?: boolean = false;
    public isMinimizable?: boolean = true;
    public isMaximizable?: boolean = true;
    public isClosable?: boolean = true;
    public isAlwaysOnTop?: boolean = false;
    public isToggleFullscreenByDblClickTitle?: boolean = true;
    public isExitFullscreenByDragTitle?: boolean = true;
    public isTitleBarVisible?: boolean = true;
    public scrollViewStyle?: any;
    public scrollViewStyleClass?: any;
    public onMinimizeButtonClick?: () => any;
    public onMaximizeButtonClick?: () => any;
    public onCloseButtonClick?: () => any;

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
