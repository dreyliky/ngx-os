import { MouseButtonEnum } from '@lib-core';
import { DragStrategyByTranslate3d } from '../classes';
import { IDraggerParams } from '../interfaces';
import { DragStrategyType } from '../types';

export class DraggerConfig implements IDraggerParams {
    public draggableElement?: HTMLElement;
    public movableElement?: HTMLElement;
    public childElementsBlackList?: HTMLElement[] = [];
    public allowedMouseButtons?: MouseButtonEnum[] = [MouseButtonEnum.left];
    public shiftX?: number;
    public shiftY?: number;
    public strategy?: DragStrategyType = new DragStrategyByTranslate3d();
    public isEnabled?: boolean = true;
    public isAllowMoveElement?: boolean = true;
}
