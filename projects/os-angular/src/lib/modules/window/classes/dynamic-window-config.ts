import { ResizerEnum } from '../../resizer/enums';

export class DynamicWindowConfig<D = any> {
    public title?: string = 'OS dynamic window';
    public data?: D;
    public width?: number = 800;
    public height?: number = 600;
    public minWidth?: number = 275;
    public minHeight?: number = 175;
    public maxWidth?: number = Infinity;
    public maxHeight?: number = Infinity;
    public allowedResizers?: ResizerEnum[];
    public positionX?: number = 128;
    public positionY?: number = 128;
    public isFullscreen?: boolean = false;
    public isHidden?: boolean = false;
    public isMinimizable?: boolean = true;
    public isMaximizable?: boolean = true;
    public isClosable?: boolean = true;
    public isAlwaysOnTop?: boolean = false;
    public scrollViewStyle?: any;
    public scrollViewStyleClass?: any;
}
