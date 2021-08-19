import { ResizerEnum } from '../enums';
import { xAxisStyleNameType, yAxisStyleNameType } from '../types';
import { MouseButtonEnum } from '../../../core';

export class ResizerConfig {
    public targetElement?: HTMLElement;
    public minWidth?: number = 20;
    public minHeight?: number = 20;
    public maxWidth?: number = Infinity;
    public maxHeight?: number = Infinity;
    public allowedResizers?: ResizerEnum[];
    public allowedMouseButtons?: MouseButtonEnum[] = [MouseButtonEnum.left];
    public xAxisStyleName?: xAxisStyleNameType = 'left';
    public yAxisStyleName?: yAxisStyleNameType = 'top';
    public isAllowChangePosition?: boolean = true;
    public isEnabled?: boolean = true;
}
