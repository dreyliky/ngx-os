import { ObjectHelper } from '../../helpers';
import { BaseState } from './base-state';

export abstract class ObjectState<T> extends BaseState<T> {
    public emitInternalData(): void {
        const clonedObject = ObjectHelper.cloneClass(this.data);

        this.set(clonedObject);
    }
}
