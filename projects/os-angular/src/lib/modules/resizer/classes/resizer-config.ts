import { ResizerEnum } from '../enums';

export class ResizerConfig {

    public targetElementSelector: string;
    public minWidth: number = 20;
    public minHeight: number = 20;
    public maxWidth: number = Infinity;
    public maxHeight: number = Infinity;
    public allowChangePosition: boolean = true;
    public allowedResizers: ResizerEnum[];
    public enabled: boolean = true;

}
