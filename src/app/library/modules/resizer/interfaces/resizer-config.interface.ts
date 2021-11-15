import { MouseButtonEnum } from '../../../core';
import { ResizerEnum } from '../enums';
import { ResizeInfo } from '../interfaces';

/** Settings of resizing for {@link ResizableDirective} */
export interface ResizerConfig {
    /** Is resizing enabled */
    isEnabled?: boolean;
    /** Target element that should be resizable */
    targetElement?: HTMLElement;
    /** The minimum width of the target element */
    minWidth?: number;
    /** The minimum height of the target element */
    minHeight?: number;
    /** The maximum width of the target element */
    maxWidth?: number;
    /** The maximum height of the target element */
    maxHeight?: number;
    /** Allowed resizers (sides and corners) */
    allowedResizers?: ResizerEnum[];
    /** Mouse buttons by using which resizing allowed */
    allowedMouseButtons?: MouseButtonEnum[];
    /**
     * Name of CSS property X-Axis from the left side of the HTML element.
     *
     * For example: `left`, `margin-left`
     **/
    xAxisLeftStyleProperty?: string;
    /**
     * Name of CSS property X-Axis from the right side of the HTML element.
     *
     * For example: `right`, `margin-right`
     **/
    xAxisRightStyleProperty?: string;
    /**
     * Name of CSS property Y-Axis from the top side of the HTML element.
     *
     * For example: `top`, `margin-top`
     **/
    yAxisTopStyleProperty?: string;
    /**
     * Name of CSS property Y-Axis from the bottom side of the HTML element.
     *
     * For example: `bottom`, `margin-bottom`
     **/
    yAxisBottomStyleProperty?: string;
    /**
     * Name of CSS property for width of the HTML element.
     *
     * For example: `width`, `min-width`
     **/
    widthStyleProperty?: string;
    /**
     * Name of CSS property for height of the HTML element.
     *
     * For example: `height`, `min-height`
     **/
    heightStyleProperty?: string;
    /** Is resizing should affect position of the HTML element */
    isAllowChangePosition?: boolean;
    /** Handler for custom logic implementation for mousemove */
    mouseMoveHandler?: (event: ResizeInfo) => void;
}
