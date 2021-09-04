import { MouseButtonEnum } from '@lib-core';
import { DraggerParams } from '../interfaces';

export class DraggerConfig implements DraggerParams {
    public draggableElement?: HTMLElement;
    public movableElement?: HTMLElement;
    public childElementsBlackList?: HTMLElement[] = [];
    public allowedMouseButtons?: MouseButtonEnum[] = [MouseButtonEnum.left];
    public shiftX?: number;
    public shiftY?: number;
    public isEnabled?: boolean = true;
    public isAllowMoveElement?: boolean = true;
}
