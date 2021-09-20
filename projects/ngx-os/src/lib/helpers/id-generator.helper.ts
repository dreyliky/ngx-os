import { RandomHelper } from './random.helper';

export abstract class IdGenerator {
    public static generate(name: string = ''): string {
        const randomId = RandomHelper.getRandomInt(1, 1000000);
        const nameAsPrefix = (name) ? `${name}-` : '';
        const result = `${nameAsPrefix}${randomId}`;

        if (document.getElementById(result)) {
            return IdGenerator.generate(name);
        }

        return `${nameAsPrefix}${randomId}`;
    }
}
