import { MouseButtonEnum } from '../../../core';
import { ResizerEnum } from '../enums';

export interface IResizerParams {
    targetElement?: HTMLElement;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    allowedResizers?: ResizerEnum[];
    allowedMouseButtons?: MouseButtonEnum[];
    xAxisLeftStyleProperty?: string;
    xAxisRightStyleProperty?: string;
    yAxisTopStyleProperty?: string;
    yAxisBottomStyleProperty?: string;
    widthStyleProperty?: string;
    heightStyleProperty?: string;
    isAllowChangePosition?: boolean;
    isEnabled?: boolean;
}
