/** @internal */
export function isNil(value: any): boolean {
    return (value === undefined || value === null);
}

/** @internal */
export function isNumber(value: any): boolean {
    return (typeof value === 'number');
}

/** @internal */
export function osParseInt(value: string): number {
    return Number.parseInt(value, 10);
}

/** @internal */
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
