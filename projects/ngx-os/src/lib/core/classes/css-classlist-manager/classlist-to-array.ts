/** @internal */
export abstract class CssClasslistToArrayHelper {
    public static transform(classlist: string | string[] | object): string[] {
        if (typeof classlist === 'string') {
            return this.fromString(classlist);
        } else if (classlist === Object(classlist)) {
            return this.fromObject(classlist);
        } else if (Array.isArray(classlist)) {
            return classlist;
        }

        throw new Error('Unsupported format for classlist');
    }

    private static fromString(classlist: string): string[] {
        return classlist.split(' ');
    }

    private static fromObject(classlist: object): string[] {
        return Object.entries(classlist)
            .filter(([, active]) => !!active)
            .map(([key]) => key);
    }
}
