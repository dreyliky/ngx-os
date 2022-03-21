import { BaseState } from './base-state';

enum Action {
    GetByKey = 'get by key',
    SetValueByKey = 'set value by key'
}

export abstract class MapState<K, V> extends BaseState<Map<K, V>> {
    constructor(initialState: Map<K, V> = new Map()) {
        super(initialState);
    }

    public getByKey(key: K): V {
        return this.tryDoAction<V>(Action.GetByKey, () => {
            return this.data.get(key);
        });
    }

    public setValueByKey(key: K, value: V): void {
        this.tryDoAction(Action.SetValueByKey, () => {
            this.data.set(key, value);

            this.set(this.data);
        });
    }
}
