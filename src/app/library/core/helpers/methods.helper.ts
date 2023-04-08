import { TemplateRef } from '@angular/core';

/** @internal */
export function ɵIsNil(value: unknown): value is undefined | null {
    return (value === undefined || value === null);
}

/** @internal */
export function ɵIsNumber(value: unknown): value is number {
    return (typeof value === 'number');
}

/** @internal */
export function ɵIsString(value: unknown): value is string {
    return (typeof value === 'string');
}

/** @internal */
export function ɵIsTemplateRef(value: unknown): value is TemplateRef<unknown> {
    return (value instanceof TemplateRef);
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
