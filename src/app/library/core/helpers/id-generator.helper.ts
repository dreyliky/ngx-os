import { RandomHelper } from './random.helper';

/** @internal */
export abstract class IdGenerator {
    public static generate(name: string = ''): string {
        const randomId = RandomHelper.getRandomInt(1, 1000000);
        const nameAsPrefix = (name) ? `${name}-` : '';

        return `${nameAsPrefix}${randomId}`;
    }
}
