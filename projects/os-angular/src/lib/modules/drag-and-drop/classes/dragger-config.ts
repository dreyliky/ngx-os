import { MouseButtonEnum } from '../../../core';

export class DraggerConfig {

    public draggableElementSelector: string;
    public movableElementSelector: string;
    public allowedMouseButtons: MouseButtonEnum[] = [MouseButtonEnum.left];
    public isEnabled: boolean = true;
    public isAllowMoveElement: boolean = true;

}
