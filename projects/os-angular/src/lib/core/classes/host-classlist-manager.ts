export class HostClasslistManager {
    private readonly data: string[] = [];

    public getAsString(): string {
        return this.data.join(' ');
    }

    public getAsArray(): string[] {
        return [...this.data];
    }

    public add(className: string): void {
        this.validateClassName(className);

        this.splitClassNameToArray(className)
            .filter((targetClassName) => !this.has(targetClassName))
            .forEach((targetClassName) => this.data.push(targetClassName));
    }

    public applyAsFlag(className: string, active: boolean): void {
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

    private splitClassNameToArray(className: string): string[] {
        return className.split(' ');
    }

    private validateClassName(className: string): void {
        if (!className) {
            throw new Error('HostClasslistManager recieve incorrect className');
        }
    }
}
