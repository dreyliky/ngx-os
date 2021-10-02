import { CssClasslistToArrayHelper } from './classList-to-array';

/** @internal */
export class ClasslistManager {
    private readonly data: string[] = [];

    public getAsString(): string {
        return this.data.join(' ');
    }

    public getAsArray(): string[] {
        return [...this.data];
    }

    public add(classList: string | string[] | object): void {
        CssClasslistToArrayHelper.transform(classList)
            .filter((targetClassName) => !this.has(targetClassName))
            .forEach((targetClassName) => this.data.push(targetClassName));
    }

    public apply(classList: string | string[] | object): void {
        if (classList === Object(classList)) {
            Object.entries(classList)
                .forEach(([className, active]) => this.applyOneAsFlag(className, active));
        } else {
            this.add(classList);
        }
    }

    public applyOneAsFlag(className: string, active: boolean): void {
        if (active) {
            this.add(className);
        } else {
            this.remove(className);
        }
    }

    public remove(className: string): void {
        const classNameIndex = this.data.indexOf(className);

        if (classNameIndex !== -1) {
            this.data.splice(classNameIndex, 1);
        }
    }

    public has(className: string): boolean {
        return this.data.includes(className);
    }
}
