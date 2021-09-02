import { ResizerEnum } from '@lib-modules/resizer';

export interface DynamicWindowParams<D = any, T = any> {
    title?: string;
    /** Custom data you can access via the window component */
    data?: D;
    /**
     * Custom data you can use to mark your window somehow you want.
     * Can be useful when you want to work with a bunch of windows as with a group.
     * for example, you need to close a group of windows with the type: MY_TYPE1
     */
    type?: T;
    width?: number;
    height?: number;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    allowedResizers?: ResizerEnum[];
    positionX?: number;
    positionY?: number;
    iconUrl?: string;
    isFullscreen?: boolean;
    isHidden?: boolean;
    isMinimizable?: boolean;
    isMaximizable?: boolean;
    isClosable?: boolean;
    isAlwaysOnTop?: boolean;
    isToggleFullscreenByDblClickTitle?: boolean;
    isExitFullscreenByDragTitle?: boolean;
    isTitleBarVisible?: boolean;
    scrollViewStyle?: any;
    scrollViewStyleClass?: any;
    onMinimizeButtonClick?: () => any;
    onMaximizeButtonClick?: () => any;
    onCloseButtonClick?: () => any;
}
