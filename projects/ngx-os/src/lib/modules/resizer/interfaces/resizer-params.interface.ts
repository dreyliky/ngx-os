import { MouseButtonEnum } from '../../../core';
import { ResizerEnum } from '../enums';
import { xAxisStyleNameType, yAxisStyleNameType } from '../types';

export interface IResizerParams {
    targetElement?: HTMLElement;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    allowedResizers?: ResizerEnum[];
    allowedMouseButtons?: MouseButtonEnum[];
    xAxisStyleName?: xAxisStyleNameType;
    yAxisStyleName?: yAxisStyleNameType;
    isAllowChangePosition?: boolean;
    isEnabled?: boolean;
}
