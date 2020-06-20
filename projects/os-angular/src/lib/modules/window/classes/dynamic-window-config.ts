export class DynamicWindowConfig<D = any> {
    public title?: string = 'OS dynamic window';
    public data?: D;
    public width?: string = 'auto';
    public height?: string = 'auto';
    public positionX?: string = '50%';
    public positionY?: string = '50%';
    public isMinimizable?: boolean = true;
    public isMaximizable?: boolean = true;
    public isClosable?: boolean = true;
    public scrollViewStyle?: any;
    public scrollViewStyleClass?: any;
}
