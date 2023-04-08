import { ɵInvertedKeysOfType } from '../../../../core';
import { ɵDragStrategyEnum } from '../../enums';

/**
 * Affects to move element by CSS axises properties.
 * A great choice for dragging absolute HTML elements
 **/
export class DragStrategyByAxisProperties {
    /** @internal */
    public readonly type = ɵDragStrategyEnum.ByAxisProperties;
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

    constructor(params?: ɵInvertedKeysOfType<DragStrategyByAxisProperties, ɵDragStrategyEnum>) {
        Object.assign(this, params);
    }
}
