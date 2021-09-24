import { IDynamicWindowParams } from '../interfaces';

// FIXME: Continue work on, refactor
/** @internal */
export function mergeConfigs(
    window: IDynamicWindowParams,
    shared: IDynamicWindowParams,
    initial: IDynamicWindowParams
): IDynamicWindowParams {
    const result: IDynamicWindowParams = { ...window, ...shared, ...initial };
    result.fullscreenOffset = { ...window.fullscreenOffset, ...shared.fullscreenOffset, ...initial?.fullscreenOffset };
    result.allowedResizers = initial?.allowedResizers ?? shared?.allowedResizers ?? window.allowedResizers;

    return result;
}
