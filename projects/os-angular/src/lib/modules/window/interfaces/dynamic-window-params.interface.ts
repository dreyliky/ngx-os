import { ResizerEnum } from '@lib-modules/resizer';

export interface DynamicWindowParams<T = any> {
    title?: string;
    data?: T;
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
