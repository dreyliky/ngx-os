/**
 * Affects to move element by CSS axises properties.
 * A great choice for dragging absolute HTML elements
 **/
export class DragStrategyByAxisProperties {
    /**
     * Name of CSS property X-Axis from the left side of the HTML element.
     *
     * For example: `left`, `marginLeft`
     **/
    public xAxisLeftStyleProperty?: string = 'left';
    /**
     * Name of CSS property Y-Axis from the top side of the HTML element.
     *
     * For example: `top`, `marginTop`
     **/
    public yAxisTopStyleProperty?: string = 'top';

    constructor(params?: DragStrategyByAxisProperties) {
        Object.assign(this, params);
    }
}
