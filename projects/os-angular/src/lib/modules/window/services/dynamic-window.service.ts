import { DOCUMENT } from '@angular/common';
import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Inject,
    Injectable,
    Injector,
    Type
} from '@angular/core';
import { Observable } from 'rxjs';
import { delay, first, tap } from 'rxjs/operators';
import { DynamicWindowConfig, DynamicWindowInjector, DynamicWindowRef } from '../classes';
import { DynamicWindowComponent } from '../components/dynamic-window';
import { DynamicWindowInputParams, DynamicWindowParams, IDynamicWindowRef } from '../interfaces';
import { DynamicWindowControlService } from './dynamic-window-control.service';

@Injectable({
    providedIn: 'root'
})
export class DynamicWindowService {
    /** Contains references to windows opened via the service. */
    public get references$(): Observable<DynamicWindowRef[]> {
        return this.windowControlService.references$;
    }

    /** Contains references to windows opened via the service. */
    public get references(): DynamicWindowRef[] {
        return this.windowControlService.references;
    }

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly injector: Injector,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly applicationRef: ApplicationRef,
        private readonly windowControlService: DynamicWindowControlService
    ) {}

    /** Opens a window containing the given component. */
    public open(component: Type<any>, params: DynamicWindowParams = {}): IDynamicWindowRef {
        const config = new DynamicWindowConfig(params);
        const windowRef = this.createDynamicWindow(config);

        this.applyDataForCreatedWindow({ component, config, windowRef });
        this.windowControlService.addWindowRef(windowRef);

        return windowRef;
    }

    private createDynamicWindow(config: DynamicWindowConfig): DynamicWindowRef {
        const windowRef = new DynamicWindowRef();
        const windowInjector = new DynamicWindowInjector({ injector: this.injector, config, windowRef });
        const componentRef = this.createComponentRef(windowInjector);

        windowRef.setComponentRef(componentRef);
        this.initWindowRefAfterClosedObserver(windowRef, componentRef);
        this.appendWindowComponentToBody(componentRef);

        return windowRef;
    }

    private createComponentRef(windowInjector: DynamicWindowInjector): ComponentRef<DynamicWindowComponent> {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicWindowComponent);

        return componentFactory.create(windowInjector);
    }

    private appendWindowComponentToBody(componentRef: ComponentRef<DynamicWindowComponent>): void {
        const componentHostView = componentRef.hostView as EmbeddedViewRef<unknown>;
        const componentHtmlElement = componentHostView.rootNodes[0] as HTMLElement;

        this.applicationRef.attachView(componentHostView);
        this.document.body.appendChild(componentHtmlElement);
    }

    private initWindowRefAfterClosedObserver(
        windowRef: DynamicWindowRef,
        componentRef: ComponentRef<DynamicWindowComponent>
    ): void {
        windowRef.afterClosed$.pipe(first())
            .pipe(
                tap(() => this.windowControlService.removeWindowRef(windowRef)),
                delay(300)
            )
            .subscribe(() => componentRef.destroy());
    }

    private applyDataForCreatedWindow({ windowRef, component, config }: DynamicWindowInputParams): void {
        const { instance: windowInstance } = windowRef.componentRef;

        windowRef.updateConfig(config);

        windowInstance.childComponentType = component;
        windowInstance.windowRef = windowRef;
        windowInstance.config = config;
    }
}
