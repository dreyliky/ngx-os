export class DragStrategyByTranslate3d {
    public isLockAxisX?: boolean = false;
    public isLockAxisY?: boolean = false;

    constructor(params?: DragStrategyByTranslate3d) {
        Object.assign(this, params);
    }
}
