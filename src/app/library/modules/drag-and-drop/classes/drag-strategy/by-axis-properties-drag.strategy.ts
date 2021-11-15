import { InvertedKeysOfType } from '../../../../core';
import { DragStrategyEnum } from '../../enums';

/**
 * Affects to move element by CSS axises properties.
 * A great choice for dragging absolute HTML elements
 **/
export class DragStrategyByAxisProperties {
    /** @internal */
    public readonly type = DragStrategyEnum.ByAxisProperties;
    /**
     * Name of CSS property X-Axis from the left side of the HTML element.
     *
     * For example: `left`, `margin-left`
     **/
    public xAxisLeftStyleProperty?: string = 'left';
    /**
     * Name of CSS property Y-Axis from the top side of the HTML element.
     *
     * For example: `top`, `margin-top`
     **/
    public yAxisTopStyleProperty?: string = 'top';

    constructor(params?: InvertedKeysOfType<DragStrategyByAxisProperties, DragStrategyEnum>) {
        Object.assign(this, params);
    }
}
