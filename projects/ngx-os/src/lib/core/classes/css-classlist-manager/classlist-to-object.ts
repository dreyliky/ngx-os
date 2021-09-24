/** @internal */
export abstract class CssClasslistToObjectHelper {
    public static transform(classlist: string | string[] | object): object {
        if (typeof classlist === 'string') {
            return this.fromString(classlist);
        } else if (Array.isArray(classlist)) {
            return this.fromArray(classlist);
        } else if (classlist === Object(classlist)) {
            return classlist;
        }

        throw new Error('Unsupported format for classlist');
    }

    private static fromString(classlist: string): object {
        return { [classlist]: true };
    }

    private static fromArray(classlist: string[]): object {
        const classlistAsString = classlist.join(' ');

        return { [classlistAsString]: true };
    }
}
