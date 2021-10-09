/* eslint-disable max-lines-per-function */
import { ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';

export function FireAfterViewInit(): any {
    return function(targetClass: any, _: string, descriptor: PropertyDescriptor): any {
        const originalMethod = descriptor.value;

        if (!targetClass.ɵIsiewInitialized$) {
            const defaultNgAfterViewInit = targetClass.ngAfterViewInit;
            const defaultNgOnDestroy = targetClass.ngOnDestroy;

            targetClass.ɵIsiewInitialized$ = new ReplaySubject();

            targetClass.ngAfterViewInit = function(): any {
                if (defaultNgAfterViewInit && typeof defaultNgAfterViewInit === 'function') {
                    const result = defaultNgAfterViewInit.apply(this);

                    targetClass.ɵIsiewInitialized$.next(true);

                    return result;
                }
            };

            targetClass.ngOnDestroy = function(): any {
                targetClass.ɵIsiewInitialized$.complete();

                if (defaultNgOnDestroy && typeof defaultNgOnDestroy === 'function') {
                    return defaultNgOnDestroy.apply(this);
                }
            };
        }

        descriptor.value = function(...args): void {
            targetClass.ɵIsiewInitialized$
                .pipe(first())
                .subscribe(() => originalMethod.apply(this, args));
        };

        return descriptor;
    };
}
