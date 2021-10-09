import { MouseButtonEnum } from '../../../core';
import { RESIZERS_ARRAY } from '../data';
import { ResizerEnum } from '../enums';
import { IResizerConfig } from '../interfaces';

/** @internal */
export class ResizerConfig implements IResizerConfig {
    public targetElement?: HTMLElement;
    public minWidth?: number;
    public minHeight?: number;
    public maxWidth?: number = Infinity;
    public maxHeight?: number = Infinity;
    public allowedResizers?: ResizerEnum[] = [...RESIZERS_ARRAY];
    public allowedMouseButtons?: MouseButtonEnum[] = [MouseButtonEnum.Left];
    public xAxisLeftStyleProperty?: string = 'left';
    public xAxisRightStyleProperty?: string;
    public yAxisTopStyleProperty?: string = 'top';
    public yAxisBottomStyleProperty?: string;
    public widthStyleProperty?: string = 'width';
    public heightStyleProperty?: string = 'height';
    public isAllowChangePosition?: boolean = true;
    public isEnabled?: boolean = true;
}
