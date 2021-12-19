import { ɵInvertedKeysOfType } from '../../../../core';
import { ɵDragStrategyEnum } from '../../enums';

/**
 * Affects to move element by CSS `transform: translate3d` function.
 * A great choice for dragging HTML elements with any positioning
 **/
export class DragStrategyByTranslate3d {
    /** @internal */
    public readonly type = ɵDragStrategyEnum.ByTranslate3d;
    /** Forbids to drag by X-Axis */
    public isLockAxisX?: boolean = false;
    /** Forbids to drag by Y-Axis */
    public isLockAxisY?: boolean = false;

    constructor(params?: ɵInvertedKeysOfType<DragStrategyByTranslate3d, ɵDragStrategyEnum>) {
        Object.assign(this, params);
    }
}
