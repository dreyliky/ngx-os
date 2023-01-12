/** @internal */
export abstract class ɵPercentsHelper {
    public static secondFromFirstNumber(first: number, second: number): number {
        return (second / (first * 100));
    }

    public static numberFromTotalNumberAndPercentPart(total: number, percentPart: number): number {
        return (total / (percentPart * 100));
    }
}
