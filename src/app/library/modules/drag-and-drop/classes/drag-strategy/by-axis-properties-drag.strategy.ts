export class DragStrategyByAxisProperties {
    public xAxisStyleProperty?: string = 'left';
    public yAxisStyleProperty?: string = 'top';

    constructor(params?: DragStrategyByAxisProperties) {
        Object.assign(this, params);
    }
}
