/** @internal */
export abstract class CssClasslistToArrayHelper {
    public static transform(classList: string | string[] | object): string[] {
        if (typeof classList === 'string') {
            return this.fromString(classList);
        } else if (classList === Object(classList)) {
            return this.fromObject(classList);
        } else if (Array.isArray(classList)) {
            return classList;
        }

        throw new Error('Unsupported format for classList');
    }

    private static fromString(classList: string): string[] {
        return classList.split(' ');
    }

    private static fromObject(classList: object): string[] {
        return Object.entries(classList)
            .filter(([, active]) => !!active)
            .map(([key]) => key);
    }
}
