import { DragStrategyEnum } from '../../enums';
import { DragStrategyByTranslate3dParams } from '../../interfaces';

/**
 * Affects to move element by CSS `transform: translate3d` function.
 * A great choice for dragging HTML elements with any positioning
 **/
export class DragStrategyByTranslate3d implements DragStrategyByTranslate3dParams {
    public readonly type = DragStrategyEnum.ByTranslate3d;
    public isLockAxisX?: boolean = false;
    public isLockAxisY?: boolean = false;

    constructor(params?: DragStrategyByTranslate3dParams) {
        Object.assign(this, params);
    }
}
