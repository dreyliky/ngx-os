export class DynamicWindowConfig<D = any> {
    public title?: string = 'OS dynamic window';
    public data?: D;
    public width?: string = 'auto';
    public height?: string = 'auto';
    public minWidth?: string = '275px';
    public minHeight?: string = '175px';
    public maxWidth?: string;
    public maxHeight?: string;
    public positionX?: string = '50%';
    public positionY?: string = '50%';
    public isFullscreen?: boolean = false;
    public isHidden?: boolean = false;
    public isMinimizable?: boolean = true;
    public isMaximizable?: boolean = true;
    public isClosable?: boolean = true;
    public scrollViewStyle?: any;
    public scrollViewStyleClass?: any;
}
