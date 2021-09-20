import { ResizerEnum } from '../../resizer';

export interface IDynamicWindowParams<D = any, T = any> {
    /** The title text of the dynamic window's title bar */
    title?: string;
    /** Custom data you can access via the component which rendered inside of the dynamic window */
    data?: D;
    /**
     * Custom data you can use to mark your window somehow you want.
     * Can be useful when you want to work with a bunch of windows as with a group.
     * for example, you need to close a group of windows with the type: MY_TYPE1
     */
    type?: T;
    /** The width of the dynamic window */
    width?: number;
    /** The height of the dynamic window */
    height?: number;
    /** The minimum width of the dynamic window */
    minWidth?: number;
    /** The minimum height of the dynamic window */
    minHeight?: number;
    /** The maximum width of the dynamic window */
    maxWidth?: number;
    /** The maximum height of the dynamic window */
    maxHeight?: number;
    /** The allowed sides of the dynamic window to resize */
    allowedResizers?: ResizerEnum[];
    /** The position by X-axis when the dynamic window will be opened */
    positionX?: number;
    /** The position by Y-axis when the dynamic window will be opened */
    positionY?: number;
    /** The link to the icon. Will be displayed in the window's title bar */
    iconUrl?: string;
    /** Applies full-screen mode for dynamic window */
    isFullscreen?: boolean;
    /** Hides dynamic window after creation */
    isHidden?: boolean;
    /** Defines can the dynamic window be hidden by user */
    isMinimizable?: boolean;
    /** Defines can the dynamic window be switched at full-screen mode and to windowed mode by user */
    isMaximizable?: boolean;
    /** Defines can the dynamic window be closed by user */
    isClosable?: boolean;
    /** Dynamic window with this flag will be always above other dynamic windows without this flag */
    isAlwaysOnTop?: boolean;
    /** Allows the switch to full-screen mode and to the windowed mode by double-clicking on title bar */
    isToggleFullscreenByDblClickTitle?: boolean;
    /** Allows going to the windowed mode from the full-screen mode by dragging dynamic window's title bar */
    isExitFullscreenByDragTitle?: boolean;
    /** Is the need to display the title bar */
    isTitleBarVisible?: boolean;
    /** Styles for scroll view component of the window */
    scrollViewStyle?: object;
    /** Classes for scroll view component of the window */
    scrollViewStyleClass?: string | string[] | object;
    /** Fires when the "hide window" button in the title bar click */
    onMinimizeButtonClick?: () => void;
    /** Fires when the "toggle full-screen for window" button in the title bar click */
    onMaximizeButtonClick?: () => void;
    /** Fires when the "close window" button in the title bar click */
    onCloseButtonClick?: () => void;
}
