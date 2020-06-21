import {
    Injectable,
    ComponentFactoryResolver,
    Type,
    Injector,
    ApplicationRef,
    EmbeddedViewRef,
    ComponentRef
} from '@angular/core';

import { DynamicWindowControlService } from './dynamic-window-control.service';
import { DynamicWindowComponent } from '../components';
import { DynamicWindowInjector, DynamicWindowConfig, DynamicWindowRef } from '../classes';
import { DynamicWindowDiParams, DynamicWindowInputParams } from '../interfaces';
import { first } from 'rxjs/operators';

@Injectable()
export class DynamicWindowService {

    constructor (
        private readonly injector: Injector,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly applicationRef: ApplicationRef,
        private readonly windowControlService: DynamicWindowControlService
    ) {}

    public open (childComponent: Type<any>, configuration: DynamicWindowConfig): DynamicWindowRef {
        const config = { ...new DynamicWindowConfig(), ...configuration };
        const windowRef = this.createDynamicWindow(config);

        this.applyDataForCreatedWindow({
            childComponent, config, windowRef
        });

        return windowRef;
    }

    private createDynamicWindow (config: DynamicWindowConfig): DynamicWindowRef {
        const windowRef = new DynamicWindowRef();
        const windowInjector = this.createWindowInjector({ config, windowRef });
        const componentRef = this.createComponentRef(windowInjector);

        this.initWindowRefAfterClosedObserver(windowRef, componentRef);
        this.appendWindowComponentToBody(componentRef);
        this.windowControlService.addWindowComponentRef(componentRef);

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
        windowRef.afterClosed$.pipe(first())
            .subscribe(() => {
                this.windowControlService.removeWindowComponentRef(componentRef);
                this.removeWindowComponentFromBody(componentRef);
            });
    }

    private applyDataForCreatedWindow (params: DynamicWindowInputParams): void {
        const windowComponents = this.windowControlService.getWindowComponentsRef();
        const lastCreatedWindowComponent = windowComponents[windowComponents.length - 1];
        const { instance: windowInstance } = lastCreatedWindowComponent;

        windowInstance.childComponentType = params.childComponent;
        windowInstance.config = params.config;
        windowInstance.windowRef = params.windowRef;
    }

}
