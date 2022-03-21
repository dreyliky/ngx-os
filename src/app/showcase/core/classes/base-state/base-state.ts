import { BehaviorSubject, Observable } from 'rxjs';

export abstract class BaseState<T> {
    public get data$(): Observable<T | null> {
        return this._data$.asObservable();
    }

    public get data(): T | null {
        return this._data$.value;
    }

    protected readonly _data$: BehaviorSubject<T | null>;

    constructor(private readonly _initialData: T = null) {
        this._data$ = new BehaviorSubject(_initialData);
    }

    public set(value: T): void {
        this._data$.next(value);
    }

    public reset(): void {
        this._data$.next(this._initialData);
    }

    public clear(): void {
        this._data$.next(null);
    }

    public emitInternalData(): void {
        this.set(this.data);
    }

    protected tryDoAction<V>(actionName: string, actionCallback: () => V): V {
        try {
            return actionCallback();
        } catch (error) {
            throw this.throwActionErrorMessage(error, actionName);
        }
    }

    private throwActionErrorMessage(error: Error, actionName: string): Error {
        if (error instanceof TypeError) {
            return new Error(`Can't ${actionName}. Firstly set value.`);
        }

        return new Error('Unknown error.');
    }
}
