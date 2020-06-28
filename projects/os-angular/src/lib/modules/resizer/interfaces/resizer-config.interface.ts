import { ResizerEnum } from '../enums';

export interface ResizerConfig {
    targetElementSelector?: string;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    allowChangePosition?: boolean;
    allowedResizers?: ResizerEnum[];
}
