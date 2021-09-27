import { MouseButtonEnum } from '../../../core';
import { ResizerEnum } from '../enums';
import { IResizerParams } from '../interfaces';
import { xAxisStyleNameType, yAxisStyleNameType } from '../types';

/** @internal */
export class ResizerConfig implements IResizerParams {
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
    public isAffectsElement?: boolean = true;
    public isEnabled?: boolean = true;
}
