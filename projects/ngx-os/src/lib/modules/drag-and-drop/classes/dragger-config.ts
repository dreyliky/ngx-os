import { MouseButtonEnum } from '@lib-core';
import { DragStrategyEnum } from '../enums';
import { IDraggerParams } from '../interfaces';

export class DraggerConfig implements IDraggerParams {
    public draggableElement?: HTMLElement;
    public movableElement?: HTMLElement;
    public childElementsBlackList?: HTMLElement[] = [];
    public allowedMouseButtons?: MouseButtonEnum[] = [MouseButtonEnum.left];
    public shiftX?: number;
    public shiftY?: number;
    public strategy?: DragStrategyEnum = DragStrategyEnum.ByTranslate3d;
    public xAxisStyleProperty?: string = 'left';
    public yAxisStyleProperty?: string = 'top';
    public isEnabled?: boolean = true;
    public isAllowMoveElement?: boolean = true;
}
