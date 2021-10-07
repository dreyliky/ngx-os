import { InjectFlags, InjectionToken, Injector, Type } from '@angular/core';
import { DYNAMIC_WINDOW_REF, IS_DYNAMIC_WINDOW_CONTEXT } from '../data';
import { IDynamicWindowConfig, IDynamicWindowDiParams } from '../interfaces';
import { DynamicWindowRef } from './dynamic-window-ref';

/**
 * @internal
 * Defines data in DI tree on dynamic window level.
 * Allows injecting these data using InjectionTokens
 * in the component rendered inside the dynamic window
 **/
export class DynamicWindowInjector implements Injector {
    private readonly parentInjector: Injector;
    private readonly config: IDynamicWindowConfig;
    private readonly windowRef: DynamicWindowRef;
    private additionalTokens: WeakMap<object, unknown>;

    constructor(
        { injector, config, windowRef }: IDynamicWindowDiParams
    ) {
        this.parentInjector = injector;
        this.config = config;
        this.windowRef = windowRef;

        this.initAdditionalTokens();
    }

    public get<T>(
        token: Type<T> | InjectionToken<T>,
        notFoundValue?: T,
        flags?: InjectFlags
    ): T;
    public get(token: any, notFoundValue?: any): any {
        const value = this.additionalTokens.get(token);

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
