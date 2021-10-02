import { MouseButtonEnum } from '../../../core';
import { DragStrategyType } from '../types';

export interface IDraggerParams {
    draggableElement?: HTMLElement;
    movableElement?: HTMLElement;
    childElementsBlackList?: HTMLElement[];
    allowedMouseButtons?: MouseButtonEnum[];
    shiftX?: number;
    shiftY?: number;
    strategy?: DragStrategyType;
    isEnabled?: boolean;
    isAllowMoveElement?: boolean;
}
