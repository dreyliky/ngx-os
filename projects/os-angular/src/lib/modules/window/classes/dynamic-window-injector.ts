import { Injector, Type, InjectionToken, InjectFlags } from '@angular/core';

export class DynamicWindowInjector implements Injector {

    constructor (
        private readonly _parentInjector: Injector,
        private readonly _additionalTokens: WeakMap<any, any>
    ) {}

    public get<T> (
        token: Type<T> | InjectionToken<T>,
        notFoundValue?: T,
        flags?: InjectFlags
    ): T;

    public get (token: any, notFoundValue?: any): any;

    public get (token: any, notFoundValue?: any, flags?: any): any {
        const value = this._additionalTokens.get(token);

        if (value) {
            return value;
        }

        return this._parentInjector.get<any>(token, notFoundValue);
    }

}
