import type { DynamicWindowConfig } from '../interfaces';

// FIXME: Investigate is it might be simplified
/** @internal */
export function ɵMergeConfigs(
    updated: DynamicWindowConfig,
    shared: DynamicWindowConfig
): DynamicWindowConfig {
    const result: DynamicWindowConfig = {};

    for (const [key, value] of Object.entries({ ...updated, ...shared })) {
        if (Array.isArray(value)) {
            result[key] = (updated[key] ?? shared[key]);
        } else if (value === Object(value)) {
            result[key] = mergeObjects(updated?.[key], shared?.[key]);
        } else {
            result[key] = updated[key] ?? shared[key];
        }
    }

    return result;
}

function mergeObjects(updatedObject: object | undefined, sharedObject: object | undefined): object {
    if (
        updatedObject?.constructor.name === 'Object' &&
        sharedObject?.constructor.name === 'Object'
    ) {
        return { ...sharedObject, ...updatedObject };
    }

    return (updatedObject ?? sharedObject);
}
