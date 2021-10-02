/** @internal */
export namespace CssClasslistToObjectHelper {
    export function transform(classList: string | string[] | object): object {
        if (typeof classList === 'string') {
            return this.fromString(classList);
        } else if (Array.isArray(classList)) {
            return this.fromArray(classList);
        } else if (classList === Object(classList)) {
            return classList;
        }

        throw new Error('Unsupported format for classList');
    }

    export function fromString(classList: string): object {
        return { [classList]: true };
    }

    export function fromArray(classList: string[]): object {
        const classListAsString = classList.join(' ');

        return { [classListAsString]: true };
    }
}
