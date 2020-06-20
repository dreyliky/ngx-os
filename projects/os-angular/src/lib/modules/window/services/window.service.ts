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
import { DynamicWindowDiParams } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class WindowService {

    public get windowComponentsRef$ (): Observable<ComponentRef<DynamicWindowComponent>[]> {
        return this._windowComponentsRef$.asObservable();
    }

    private readonly _windowComponentsRef$ = new BehaviorSubject<ComponentRef<DynamicWindowComponent>[]>([]);

    constructor (
        private readonly injector: Injector,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly applicationRef: ApplicationRef
    ) {}

    public open (childComponent: Type<any>, config: DynamicWindowConfig): DynamicWindowRef {
        const dynamicWindowRef = this.createDynamicWindow(config);

        this.applyChildComponentForCreatedWindow(childComponent);

        return dynamicWindowRef;
    }

    private createDynamicWindow (config: DynamicWindowConfig): DynamicWindowRef {
        const windowRef = new DynamicWindowRef();
        const windowInjector = this.createWindowInjector({ config, windowRef });
        const componentRef = this.createComponentRef(windowInjector);

        this.initWindowRefAfterClosedObserver(windowRef, componentRef);
        this.appendWindowComponentToBody(componentRef);
        this.registerWindowComponent(componentRef);

        return windowRef;
    }

    private createWindowInjector (params: DynamicWindowDiParams): DynamicWindowInjector {
        const DI_MAP = new WeakMap();

        DI_MAP.set(DynamicWindowConfig, params.config);
        DI_MAP.set(DynamicWindowRef, params.windowRef);

        return new DynamicWindowInjector(this.injector, DI_MAP);
    }

    private createComponentRef (windowInjector: DynamicWindowInjector): ComponentRef<DynamicWindowComponent> {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicWindowComponent);

        return componentFactory.create(windowInjector);
    }

    private appendWindowComponentToBody (componentRef: ComponentRef<DynamicWindowComponent>): void {
        this.applicationRef.attachView(componentRef.hostView);

        const domElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElement);
    }

    private removeWindowComponentFromBody (componentRef: ComponentRef<DynamicWindowComponent>): void {
        componentRef.destroy();
    }

    private initWindowRefAfterClosedObserver (
        windowRef: DynamicWindowRef,
        componentRef: ComponentRef<DynamicWindowComponent>
    ): void {
        const afterClosedSubscription = windowRef.afterClosed$
            .subscribe(() => {
                this.removeWindowComponentFromBody(componentRef);

                afterClosedSubscription.unsubscribe();
            });
    }

    private registerWindowComponent (componentRef: ComponentRef<DynamicWindowComponent>): void {
        const windowComponentsRef = this._windowComponentsRef$.getValue();

        this._windowComponentsRef$.next([...windowComponentsRef, componentRef]);
    }

    private applyChildComponentForCreatedWindow (childComponent: Type<any>): void {
        const windowComponents = this._windowComponentsRef$.getValue();
        const lastCreatedWindowComponent = windowComponents[windowComponents.length - 1];

        lastCreatedWindowComponent.instance.childComponentType = childComponent;
    }

}
