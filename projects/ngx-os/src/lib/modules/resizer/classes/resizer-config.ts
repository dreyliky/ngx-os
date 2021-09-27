import { MouseButtonEnum } from '../../../core';
import { ResizerEnum } from '../enums';
import { IResizerParams } from '../interfaces';

/** @internal */
export class ResizerConfig implements IResizerParams {
    public targetElement?: HTMLElement;
    public minWidth?: number = 20;
    public minHeight?: number = 20;
    public maxWidth?: number = Infinity;
    public maxHeight?: number = Infinity;
    public allowedResizers?: ResizerEnum[];
    public allowedMouseButtons?: MouseButtonEnum[] = [MouseButtonEnum.left];
    public xAxisLeftStyleProperty?: string = 'left';
    public xAxisRightStyleProperty?: string;
    public yAxisTopStyleProperty?: string = 'top';
    public yAxisBottomStyleProperty?: string;
    public widthStyleProperty?: string = 'width';
    public heightStyleProperty?: string = 'height';
    public isAllowChangePosition?: boolean = true;
    public isAffectsElement?: boolean = true;
    public isEnabled?: boolean = true;
}
