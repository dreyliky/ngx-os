import { ResizerEnum } from '../enums';
import { xAxisStyleNameType, yAxisStyleNameType } from '../types';

export class ResizerConfig {

    public targetElementSelector: string;
    public minWidth: number = 20;
    public minHeight: number = 20;
    public maxWidth: number = Infinity;
    public maxHeight: number = Infinity;
    public allowChangePosition: boolean = true;
    public allowedResizers: ResizerEnum[];
    public xAxisStyleName: xAxisStyleNameType = 'left';
    public yAxisStyleName: yAxisStyleNameType = 'top';
    public enabled: boolean = true;

}
