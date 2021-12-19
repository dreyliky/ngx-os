import { DynamicWindowConfig } from '../interfaces';

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
            result[key] = { ...shared?.[key], ...updated?.[key] };
        } else {
            result[key] = updated[key] ?? shared[key];
        }
    }

    return result;
}
