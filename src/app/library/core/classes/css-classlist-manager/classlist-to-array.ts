/** @internal */
export namespace CssClasslistToArrayHelper {
    export function transform(classList: string | string[] | object): string[] {
        if (typeof classList === 'string') {
            return this.fromString(classList);
        } else if (classList === Object(classList)) {
            return this.fromObject(classList);
        } else if (Array.isArray(classList)) {
            return classList;
        }

        throw new Error('Unsupported format for classList');
    }

    export function fromString(classList: string): string[] {
        return classList.split(' ');
    }

    export function fromObject(classList: object): string[] {
        return Object.entries(classList)
            .filter(([, active]) => !!active)
            .map(([key]) => key);
    }
}
