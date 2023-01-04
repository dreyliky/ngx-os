import { InjectionToken, Injector, Type } from '@angular/core';
import { DYNAMIC_WINDOW_REF, IS_DYNAMIC_WINDOW_CONTEXT } from '../data';
import { ɵDynamicWindowDiParams } from '../interfaces';
import { ɵDynamicWindowRefModel } from './dynamic-window-ref';

/**
 * @internal
 * Defines data in DI tree on dynamic window level.
 * Allows injecting these data using InjectionTokens
 * in the component rendered inside the dynamic window
 **/
export class ɵDynamicWindowInjector implements Injector {
    private readonly parentInjector: Injector;
    private readonly windowRef: ɵDynamicWindowRefModel;
    private additionalTokens: WeakMap<object, unknown>;

    constructor(
        { injector, windowRef }: ɵDynamicWindowDiParams
    ) {
        this.parentInjector = injector;
        this.windowRef = windowRef;

        this.initAdditionalTokens();
    }

    public get<T>(
        token: Type<T> | InjectionToken<T>,
        notFoundValue?: T
    ): T {
        const value = this.additionalTokens.get(token) as T;

        if (value) {
            return value;
        }

        return this.parentInjector.get<any>(token, notFoundValue);
    }

    private initAdditionalTokens(): void {
        this.additionalTokens = new WeakMap();

        this.additionalTokens.set(DYNAMIC_WINDOW_REF, this.windowRef);
        this.additionalTokens.set(IS_DYNAMIC_WINDOW_CONTEXT, true);
    }
}
