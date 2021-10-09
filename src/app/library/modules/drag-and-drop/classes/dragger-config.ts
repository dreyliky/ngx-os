import { MouseButtonEnum } from '../../../core';
import { IDraggerConfig } from '../interfaces';
import { DragStrategyType } from '../types';
import { DragStrategyByTranslate3d } from './drag-strategy';

export class DraggerConfig implements IDraggerConfig {
    public draggableElement?: HTMLElement;
    public movableElement?: HTMLElement;
    public childElementsBlackList?: HTMLElement[] = [];
    public allowedMouseButtons?: MouseButtonEnum[] = [MouseButtonEnum.Left];
    public shiftX?: number;
    public shiftY?: number;
    public strategy?: DragStrategyType = new DragStrategyByTranslate3d();
    public isEnabled?: boolean = true;
    public isAllowMoveElement?: boolean = true;
}
