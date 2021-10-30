import { DragStrategyEnum } from '../../enums';
import { DragStrategyByAxisPropertiesParams } from '../../interfaces';

/**
 * Affects to move element by CSS axises properties.
 * A great choice for dragging absolute HTML elements
 **/
export class DragStrategyByAxisProperties implements DragStrategyByAxisPropertiesParams {
    public readonly type = DragStrategyEnum.ByAxisProperties;
    public xAxisLeftStyleProperty?: string = 'left';
    public yAxisTopStyleProperty?: string = 'top';

    constructor(params?: DragStrategyByAxisPropertiesParams) {
        Object.assign(this, params);
    }
}
