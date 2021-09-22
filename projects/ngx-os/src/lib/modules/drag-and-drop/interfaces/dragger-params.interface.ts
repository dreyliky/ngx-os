import { MouseButtonEnum } from '@lib-core';

export interface IDraggerParams {
    draggableElement?: HTMLElement;
    movableElement?: HTMLElement;
    childElementsBlackList?: HTMLElement[];
    allowedMouseButtons?: MouseButtonEnum[];
    shiftX?: number;
    shiftY?: number;
    isEnabled?: boolean;
    isAllowMoveElement?: boolean;
}
