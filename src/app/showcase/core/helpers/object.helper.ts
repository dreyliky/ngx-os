export namespace ObjectHelper {
    export function clone<T>(object: T): T {
        return { ...object };
    }

    export function deepClone<T>(object: T): T {
        return JSON.parse(JSON.stringify(object));
    }

    export function cloneClass<T>(targetInstance: T): T {
        const instancePrototype = Object.getPrototypeOf(targetInstance);
        const newInstance = Object.create(instancePrototype);

        return Object.assign(newInstance, targetInstance);
    }
}
