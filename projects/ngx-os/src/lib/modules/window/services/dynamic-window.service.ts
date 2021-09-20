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
import { delay, tap } from 'rxjs/operators';
import { DynamicWindowConfig, DynamicWindowInjector, DynamicWindowRef } from '../classes';
import { DynamicWindowComponent } from '../components';
import { DynamicWindowInputParams, IDynamicWindowParams, IDynamicWindowRef } from '../interfaces';
import { DynamicWindowConfigControlService } from './dynamic-window-config-control.service';
import { DynamicWindowReferencesService } from './dynamic-window-references.service';

@Injectable({
    providedIn: 'root'
})
export class DynamicWindowService {
    /** Contains references to windows opened via the service */
    public get references$(): Observable<DynamicWindowRef[]> {
        return this.referencesService.data$;
    }

    /** Contains references to windows opened via the service */
    public get references(): DynamicWindowRef[] {
        return this.referencesService.data;
    }

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly injector: Injector,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly applicationRef: ApplicationRef,
        private readonly referencesService: DynamicWindowReferencesService,
        private readonly configControlService: DynamicWindowConfigControlService
    ) {}

    /** Opens a window containing the given component */
    public open(component: Type<any>, params: IDynamicWindowParams = {}): IDynamicWindowRef {
        const config = this.configControlService.process(new DynamicWindowConfig(params));
        const windowRef = this.createDynamicWindow(config);

        this.applyDataForCreatedWindow({ component, config, windowRef });
        this.referencesService.add(windowRef);

        return windowRef;
    }

    /** Closes all windows */
    public closeAll(): void {
        this.references
            .forEach((windowRef) => windowRef.close());
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
        const destroyDelayInMs = 300;

        windowRef.afterClosed$
            .pipe(
                tap(() => this.referencesService.remove(windowRef)),
                delay(destroyDelayInMs)
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
