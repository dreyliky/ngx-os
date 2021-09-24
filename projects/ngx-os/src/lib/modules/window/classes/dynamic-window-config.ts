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
    public fullscreenOffset = {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
    };

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

    constructor(
        public readonly initialParams: IDynamicWindowParams = {}
    ) {
        Object.assign(this, initialParams);
        this.initWidth(initialParams);
        this.initHeight(initialParams);
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
