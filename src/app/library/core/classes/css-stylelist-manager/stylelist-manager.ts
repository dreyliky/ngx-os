/** @internal */
export class StyleListManager {
    private data: object = {};

    public get(): object {
        return this.data;
    }

    public apply(stylelist: object): void {
        this.data = { ...this.data, ...stylelist };
    }
}
