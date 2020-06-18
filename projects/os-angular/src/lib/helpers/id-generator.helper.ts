import { RandomHelper } from './random.helper';

export class IdGenerator {

    public static generate (name: string = ''): string {
        const randomId     = RandomHelper.getRandomInt(1, 100000);
        const nameAsPrefix = (name) ? `${name}-` : '';

        return `${nameAsPrefix}${randomId}`;
    }

}
