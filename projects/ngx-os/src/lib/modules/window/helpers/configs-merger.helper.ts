import { IDynamicWindowParams } from '../interfaces';

/** @internal */
export function mergeConfigs(
    current: IDynamicWindowParams,
    updated: IDynamicWindowParams,
    shared: IDynamicWindowParams
): IDynamicWindowParams {
    const result: IDynamicWindowParams = {};

    for (const [key, value] of Object.entries(current)) {
        if (Array.isArray(value)) {
            result[key] = [...(updated[key] ?? current[key] ?? shared[key])];
        } else if (value === Object(value)) {
            result[key] = { ...updated?.[key], ...current?.[key], ...shared?.[key] };
        } else {
            result[key] = current[key] ?? shared[key] ?? updated[key];
        }
    }

    return result;
}
