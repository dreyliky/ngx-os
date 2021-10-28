/** @internal */
export function isNil(value: any): boolean {
    return (value === undefined || value === null);
}

/** @internal */
export function osParseInt(value: string): number {
    return Number.parseInt(value, 10);
}

export function deepClone<T>(data: T): T {
    return JSON.parse(JSON.stringify(data));
}

/** @internal */
export function isObjectsWithSameData(objectA: Object, objectB: Object): boolean {
    const keysOfObjectA = Object.keys(objectA);
    const keysOfObjectB = Object.keys(objectB);

    if (keysOfObjectA.length === keysOfObjectB.length) {
        return keysOfObjectA
            .every((key) => objectA[key] === objectB[key]);
    }

    return false;
}
