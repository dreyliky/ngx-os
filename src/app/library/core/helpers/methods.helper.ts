/** @internal */
export function ɵIsNil(value: any): boolean {
    return (value === undefined || value === null);
}

/** @internal */
export function ɵIsNumber(value: any): boolean {
    return (typeof value === 'number');
}

/** @internal */
export function ɵParseInt(value: string): number {
    return Number.parseInt(value, 10);
}

/** @internal */
export function ɵDeepClone<T>(data: T): T {
    return JSON.parse(JSON.stringify(data));
}

/** @internal */
export function ɵIsObjectsWithSameData(objectA: Object, objectB: Object): boolean {
    const keysOfObjectA = Object.keys(objectA);
    const keysOfObjectB = Object.keys(objectB);

    if (keysOfObjectA.length === keysOfObjectB.length) {
        return keysOfObjectA
            .every((key) => objectA[key] === objectB[key]);
    }

    return false;
}
