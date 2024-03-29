import { Type } from '@angular/core';
import { CssCoordinate } from '../../../core';
import type { DraggerConfig } from '../../drag-and-drop';
import type { ResizerConfig, ResizerEnum } from '../../resizer';
import { DynamicWindowFullscreenOffset } from './fullscreen-offset.interface';

/** The parameters to set up a dynamic window and pass some custom data for the component which will be rendered inside */
export interface DynamicWindowConfig<D = any, T = any> {
    /** The title text of the dynamic window's title bar */
    title?: string;
    /** Custom data you can access via the component which rendered inside of the dynamic window */
    data?: D;
    /**
     * Custom data you can use to mark your window somehow you want.
     * Can be useful when you want to work with a bunch of windows as with a group.
     * For example, you need to close a group of windows with the type: MY_TYPE1
     */
    type?: T;
    /** The component for the title bar with content which will be rendered instead of default content */
    titleBarCustomContent?: Type<any>;
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
    /** The position of the dynamic window by X-axis */
    positionX?: number;
    /** The position of the dynamic window by Y-axis */
    positionY?: number;
    /** The link to the icon. Will be displayed in the window's title bar */
    iconUrl?: string;
    /** Parameters of offsets from the edges of the screen in the full-screen mode */
    fullscreenOffset?: DynamicWindowFullscreenOffset;
    /** Coordinates as CSS strings the dynamic window will be hidden into */
    hidesInto?: CssCoordinate;
    /** The dynamic window will be at full-screen mode after the creation */
    isFullscreenByDefault?: boolean;
    /** The dynamic window will be hidden after the creation */
    isHiddenByDefault?: boolean;
    /** Defines can the dynamic window be hidden by user */
    isAllowHide?: boolean;
    /** Defines can the dynamic window be switched at full-screen mode and to windowed mode by user */
    isAllowFullscreen?: boolean;
    /** Defines can the dynamic window be closed by user */
    isAllowClose?: boolean;
    /** Dynamic window with this flag will be always above other dynamic windows without this flag */
    isAlwaysOnTop?: boolean;
    /** Allows the switch to full-screen mode and to the windowed mode by double-clicking on title bar */
    isToggleFullscreenByDblClickOnTitleBar?: boolean;
    /** Allows going to the windowed mode from the full-screen mode by dragging dynamic window's title bar */
    isExitFullscreenByDragTitleBar?: boolean;
    /** Is the need to display the title bar */
    isTitleBarVisible?: boolean;
    /** Stylelist for the dynamic window */
    style?: object;
    /** Classlist for the dynamic window */
    styleClass?: string | string[] | object;
    /** Stylelist for the title bar of the dynamic window */
    titleBarStyle?: object;
    /** Classlist for the title bar of the dynamic window */
    titleBarStyleClass?: string | string[] | object;
    /** Stylelist for scroll view component of the window */
    scrollViewStyle?: object;
    /** Classlist for scroll view component of the window */
    scrollViewStyleClass?: string | string[] | object;
    /** Configuration for {@link DraggableDirective} */
    draggerConfig?: DraggerConfig;
    /** Configuration for {@link ResizableDirective} */
    resizerConfig?: ResizerConfig;
}
