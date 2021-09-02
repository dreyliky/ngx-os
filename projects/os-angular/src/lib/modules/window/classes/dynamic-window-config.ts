import { ResizerEnum } from '../../resizer';
import { DynamicWindowParams } from '../interfaces/dynamic-window-params.interface';

export class DynamicWindowConfig<D = any, T = any> implements DynamicWindowParams {
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
    public positionX?: number = 128;
    public positionY?: number = 128;
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

    constructor(params: DynamicWindowParams) {
        this.applyParams(params);
        this.initWidth(params);
        this.initHeight(params);
    }

    private initWidth(params: DynamicWindowParams): void {
        if (params.minWidth && !params.width) {
            this.width = params.minWidth;
        }
    }

    private initHeight(params: DynamicWindowParams): void {
        if (params.minHeight && !params.height) {
            this.height = params.minHeight;
        }
    }

    private applyParams(params: DynamicWindowParams): void {
        for (const [key, value] of Object.entries(params)) {
            this[key] = value;
        }
    }
}
