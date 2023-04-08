import { MouseButtonEnum } from '../../../core';
import { ɵRESIZERS_ARRAY } from '../data';
import { ResizerEnum } from '../enums';
import { ResizeInfo, ResizerConfig } from '../interfaces';

/** @internal */
export class ɵResizerConfigModel implements ResizerConfig {
    public targetElement?: HTMLElement;
    public minWidth?: number;
    public minHeight?: number;
    public maxWidth?: number = Infinity;
    public maxHeight?: number = Infinity;
    public allowedResizers?: ResizerEnum[] = [...ɵRESIZERS_ARRAY];
    public allowedMouseButtons?: MouseButtonEnum[] = [MouseButtonEnum.Left];
    public xAxisLeftStyleProperty?: string = 'left';
    public xAxisRightStyleProperty?: string;
    public yAxisTopStyleProperty?: string = 'top';
    public yAxisBottomStyleProperty?: string;
    public widthStyleProperty?: string = 'width';
    public heightStyleProperty?: string = 'height';
    public isAllowChangePosition?: boolean = true;
    public isEnabled?: boolean = true;
    public mouseMoveHandler?: (event: ResizeInfo) => void;
}
