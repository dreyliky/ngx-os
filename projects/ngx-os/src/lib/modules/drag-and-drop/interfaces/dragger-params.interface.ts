import { MouseButtonEnum } from '@lib-core';
import { DragStrategyEnum } from '../enums';

export interface IDraggerParams {
    draggableElement?: HTMLElement;
    movableElement?: HTMLElement;
    childElementsBlackList?: HTMLElement[];
    allowedMouseButtons?: MouseButtonEnum[];
    shiftX?: number;
    shiftY?: number;
    strategy?: DragStrategyEnum;
    xAxisStyleProperty?: string;
    yAxisStyleProperty?: string;
    isEnabled?: boolean;
    isAllowMoveElement?: boolean;
}
