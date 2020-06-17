export class IdGenerator {

    public static generate (name: string): string {
        return `${name}-${Math.random()}`;
    }

}
