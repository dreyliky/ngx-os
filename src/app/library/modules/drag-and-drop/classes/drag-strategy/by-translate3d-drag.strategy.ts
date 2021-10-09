/**
 * Affects to move element by CSS `transform: translate3d` function.
 * A great choice for dragging HTML elements with any positioning
 **/
export class DragStrategyByTranslate3d {
    /** Forbids to drag by X-Axis  */
    public isLockAxisX?: boolean = false;
    /** Forbids to drag by Y-Axis  */
    public isLockAxisY?: boolean = false;

    constructor(params?: DragStrategyByTranslate3d) {
        Object.assign(this, params);
    }
}
