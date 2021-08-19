import { MouseButtonEnum } from '../../../core';

export class DraggerConfig {
    public draggableElement?: HTMLElement;
    public movableElement?: HTMLElement;
    public childElementsBlackList?: HTMLElement[] = [];
    public allowedMouseButtons?: MouseButtonEnum[] = [MouseButtonEnum.left];
    public shiftX?: number;
    public shiftY?: number;
    public isEnabled?: boolean = true;
    public isAllowMoveElement?: boolean = true;
}
