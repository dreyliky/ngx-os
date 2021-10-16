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
        const classListAsArray = classList.split(' ');

        return fromArray(classListAsArray);
    }

    export function fromArray(classList: string[]): object {
        return classList
            .filter((className) => className)
            .reduce((accumulator, className) => {
                accumulator[className] = true;

                return accumulator;
            }, {});
    }
}
