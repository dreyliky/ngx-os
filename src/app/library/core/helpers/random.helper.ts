/** @internal */
export abstract class RandomHelper {
    public static getRandomInt(min: number, max: number): number {
        const minN = Math.ceil(min);
        const maxN = Math.floor(max);

        return Math.floor(Math.random() * (maxN - minN)) + minN;
    }
}
