import {
    Injectable,
    ComponentFactoryResolver,
    Type,
    Injector,
    ApplicationRef,
    EmbeddedViewRef,
    ComponentRef
} from '@angular/core';

import { DynamicWindowComponent } from '../components';
import { DynamicWindowInjector, DynamicWindowConfig, DynamicWindowRef } from '../classes';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class WindowService {

    private readonly _windowComponentsRef$ = new BehaviorSubject<ComponentRef<DynamicWindowComponent>[]>([]);

    constructor (
        private readonly injector: Injector,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly applicationRef: ApplicationRef
    ) {}

    public open (componentOrTemplate: Type<any>, config: DynamicWindowConfig): DynamicWindowRef {
        const dynamicWindowRef = this.appendWindowComponentToBody(config);
        const windowComponentsRef = this._windowComponentsRef$.getValue();
        const createdWindowComponentRef = windowComponentsRef[windowComponentsRef.length - 1];

        createdWindowComponentRef.instance.childComponentType = componentOrTemplate;

        return dynamicWindowRef;
    }

    private appendWindowComponentToBody (config: DynamicWindowConfig): DynamicWindowRef {
        const dynamicWindowRef = new DynamicWindowRef();
        const DI_MAP = new WeakMap();
        DI_MAP.set(DynamicWindowConfig, config);
        DI_MAP.set(DynamicWindowRef, dynamicWindowRef);

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicWindowComponent);
        const dynamicWindowInjector = new DynamicWindowInjector(this.injector, DI_MAP);
        const componentRef = componentFactory.create(dynamicWindowInjector);

        const sub = dynamicWindowRef.afterClosed$
            .subscribe(() => {
                this.removeWindowComponentFromBody(componentRef);
                sub.unsubscribe();
            });

        this.applicationRef.attachView(componentRef.hostView);

        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);

        const windowComponentsRef = this._windowComponentsRef$.getValue();
        this._windowComponentsRef$.next([...windowComponentsRef, componentRef]);

        return dynamicWindowRef;
    }

    private removeWindowComponentFromBody (componentRef: ComponentRef<DynamicWindowComponent>): void {
        componentRef.destroy();
    }

}
