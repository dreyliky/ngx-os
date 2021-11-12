import { InvertedKeysOfType } from '../../../../core';
import { DragStrategyEnum } from '../../enums';

/**
 * Affects to move element by CSS `transform: translate3d` function.
 * A great choice for dragging HTML elements with any positioning
 **/
export class DragStrategyByTranslate3d {
    /** @internal */
    public readonly type = DragStrategyEnum.ByTranslate3d;
    /** Forbids to drag by X-Axis */
    public isLockAxisX?: boolean = false;
    /** Forbids to drag by Y-Axis */
    public isLockAxisY?: boolean = false;

    constructor(params?: InvertedKeysOfType<DragStrategyByTranslate3d, DragStrategyEnum>) {
        Object.assign(this, params);
    }
}
