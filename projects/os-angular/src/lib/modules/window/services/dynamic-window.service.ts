import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Injectable,
    Injector,
    Type
} from '@angular/core';
import { Observable } from 'rxjs';
import { delay, first, tap } from 'rxjs/operators';
import { DynamicWindowConfig, DynamicWindowInjector, DynamicWindowRef } from '../classes';
import { DynamicWindowComponent } from '../components/dynamic-window';
import { DynamicWindowDiParams, DynamicWindowInputParams, DynamicWindowParams, IDynamicWindowRef } from '../interfaces';
import { DynamicWindowControlService } from './dynamic-window-control.service';

@Injectable({
    providedIn: 'root'
})
export class DynamicWindowService {
    public get references$(): Observable<DynamicWindowRef[]> {
        return this.windowControlService.references$;
    }

    constructor(
        private readonly injector: Injector,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly applicationRef: ApplicationRef,
        private readonly windowControlService: DynamicWindowControlService
    ) {}

    public open(childComponent: Type<any>, params: DynamicWindowParams = {}): IDynamicWindowRef {
        const config = new DynamicWindowConfig(params);
        const windowRef = this.createDynamicWindow(config);

        this.applyDataForCreatedWindow({ childComponent, config, windowRef });
        this.windowControlService.addWindowRef(windowRef);

        return windowRef;
    }

    private createDynamicWindow(config: DynamicWindowConfig): DynamicWindowRef {
        const windowRef = new DynamicWindowRef();
        const windowInjector = this.createWindowInjector({ config, windowRef });
        const componentRef = this.createComponentRef(windowInjector);

        windowRef.setComponentRef(componentRef);
        this.initWindowRefAfterClosedObserver(windowRef, componentRef);
        this.appendWindowComponentToBody(componentRef);

        return windowRef;
    }

    private createWindowInjector(params: DynamicWindowDiParams): DynamicWindowInjector {
        const DI_MAP = new WeakMap();

        DI_MAP.set(DynamicWindowConfig, params.config);
        DI_MAP.set(DynamicWindowRef, params.windowRef);

        return new DynamicWindowInjector(this.injector, DI_MAP);
    }

    private createComponentRef(windowInjector: DynamicWindowInjector): ComponentRef<DynamicWindowComponent> {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicWindowComponent);

        return componentFactory.create(windowInjector);
    }

    private appendWindowComponentToBody(componentRef: ComponentRef<DynamicWindowComponent>): void {
        this.applicationRef.attachView(componentRef.hostView);

        const domElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElement);
    }

    private initWindowRefAfterClosedObserver(
        windowRef: DynamicWindowRef,
        componentRef: ComponentRef<DynamicWindowComponent>
    ): void {
        windowRef.afterClosed$.pipe(first())
            .pipe(
                tap(() => this.windowControlService.removeWindowRef(windowRef)),
                delay(1000)
            )
            .subscribe(() => componentRef.destroy());
    }

    private applyDataForCreatedWindow(params: DynamicWindowInputParams): void {
        const { instance: windowInstance } = params.windowRef.componentRef;

        params.windowRef.updateConfig(params.config);

        windowInstance.childComponentType = params.childComponent;
        windowInstance.windowRef = params.windowRef;
        windowInstance.config = params.config;
    }
}
