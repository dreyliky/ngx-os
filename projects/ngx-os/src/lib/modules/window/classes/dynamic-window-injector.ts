import { InjectFlags, InjectionToken, Injector, Type } from '@angular/core';
import { IS_DYNAMIC_WINDOW_CONTEXT } from '@lib-core';
import { IDynamicWindowDiParams, IDynamicWindowParams } from '../interfaces';
import { DynamicWindowConfig } from './dynamic-window-config';
import { DynamicWindowRef } from './dynamic-window-ref';

export class DynamicWindowInjector implements Injector {
    private readonly parentInjector: Injector;
    private readonly config: IDynamicWindowParams;
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

        this.additionalTokens.set(DynamicWindowConfig, this.config);
        this.additionalTokens.set(DynamicWindowRef, this.windowRef);
        this.additionalTokens.set(IS_DYNAMIC_WINDOW_CONTEXT, true);
    }
}
