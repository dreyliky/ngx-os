import { OsBaseViewComponent } from '../classes';
import { isObjectsWithSameData } from '../helpers';

/**
 * @internal
 * Returns a new instance of the object only when DATA inside new instance
 * is different than DATA in instance returned previous time.
 **/
export function CachableReturnInstance<T>(
    baseView: OsBaseViewComponent,
    methodName: string,
    { get, enumerable, value }: TypedPropertyDescriptor<T>
): any {
    if (get) {
        return patchMethod(enumerable, methodName, get);
    }

    if (typeof(value) !== 'function') {
        throw new Error('CachableReturnInstance can only be used with functions or getters');
    }

    return patchMethod(enumerable, methodName, value);
}

function patchMethod<T>(enumerable: boolean, methodName: string, originalMethod: Function): any {
    return {
        enumerable,
        get(): T {
            const previousInstance = this[`ɵ${methodName}`];
            const newInstance = originalMethod.call(this);

            if (!previousInstance || !isObjectsWithSameData(previousInstance, newInstance)) {
                this[`ɵ${methodName}`] = newInstance;

                return newInstance;
            }

            return previousInstance;
        }
    };
}
