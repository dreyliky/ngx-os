import { CssClasslistToArrayHelper } from './classlist-to-array';

export class ClasslistManager {
    private readonly data: string[] = [];

    public getAsString(): string {
        return this.data.join(' ');
    }

    public getAsArray(): string[] {
        return [...this.data];
    }

    public add(classlist: string | string[] | object): void {
        CssClasslistToArrayHelper.transform(classlist)
            .filter((targetClassName) => !this.has(targetClassName))
            .forEach((targetClassName) => this.data.push(targetClassName));
    }

    public apply(classlist: string | string[] | object): void {
        if (classlist === Object(classlist)) {
            Object.entries(classlist)
                .forEach(([className, active]) => this.applyOneAsFlag(className, active));
        } else {
            this.add(classlist);
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
