import { ɵOsBaseViewComponent } from '../classes';
import { ɵIsObjectsWithSameData } from '../helpers';

/**
 * @internal
 * Returns a new instance of the object only when DATA inside new instance
 * is different than DATA in instance returned previous time.
 **/
export function ɵCacheableReturnInstance<T>(
    baseView: ɵOsBaseViewComponent,
    methodName: string,
    { get, enumerable, value }: TypedPropertyDescriptor<T>
): any {
    if (get) {
        return patchMethod(enumerable, methodName, get);
    }

    if (typeof(value) !== 'function') {
        throw new Error('CacheableReturnInstance can only be used with functions or getters');
    }

    return patchMethod(enumerable, methodName, value);
}

function patchMethod<T>(enumerable: boolean, methodName: string, originalMethod: Function): any {
    return {
        enumerable,
        get(): T {
            const previousInstance = this[`ɵ${methodName}`];
            const newInstance = originalMethod.call(this);

            if (!previousInstance || !ɵIsObjectsWithSameData(previousInstance, newInstance)) {
                this[`ɵ${methodName}`] = newInstance;

                return newInstance;
            }

            return previousInstance;
        }
    };
}
