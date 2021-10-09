import { MouseButtonEnum } from '../../../core';
import { DragStrategyType } from '../types';

/** Settings of dragging for {@link DraggableDirective} */
export interface IDraggerConfig {
    /** The target element by dragging which the dragging of `movableElement` will take place */
    draggableElement?: HTMLElement;
    /** The target element will be moving as a result of dragging by `draggableElement`. */
    movableElement?: HTMLElement;
    /**
     * Child elements by trying dragging which, prevent dragging process.
     * Prevents dragging if some of those element contain in `mouseEvent.target`
     **/
    childElementsBlackList?: HTMLElement[];
    /** Mouse buttons by using which dragging allowed */
    allowedMouseButtons?: MouseButtonEnum[];
    /** Offset relative to the cursor by X-Axis when dragging */
    shiftX?: number;
    /** Offset relative to the cursor by Y-Axis when dragging */
    shiftY?: number;
    /** Dragging strategy. Different strategy affects element in a different way */
    strategy?: DragStrategyType;
    /** Is dragging enabled */
    isEnabled?: boolean;
    /** Should directive move movable element? */
    isAllowMoveElement?: boolean;
}
