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
import { DynamicWindowInjector, DynamicWindowRefModel } from '../classes';
import { DynamicWindowComponent } from '../components';
import { DynamicWindowConfig, DynamicWindowInputParams } from '../interfaces';
import { DynamicWindowReferencesService } from './dynamic-window-references.service';

/**
 * @dynamic
 * Allows open your component inside an OS window
 **/
// See: https://github.com/angular/angular/issues/20351
@Injectable({
    providedIn: 'root'
})
export class DynamicWindowService {
    /** Contains references to windows opened via the service */
    public get references$(): Observable<DynamicWindowRefModel[]> {
        return this.referencesService.data$;
    }

    /** Contains references to windows opened via the service */
    public get references(): DynamicWindowRefModel[] {
        return this.referencesService.data;
    }

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly injector: Injector,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly applicationRef: ApplicationRef,
        private readonly referencesService: DynamicWindowReferencesService
    ) {}

    /** Opens a window containing the given component */
    public open(component: Type<any>, config: DynamicWindowConfig = {}): DynamicWindowRefModel {
        const windowRef = this.createDynamicWindow(config);

        this.referencesService.register(windowRef, config);
        this.applyDataForCreatedWindowInstance({ component, windowRef });

        return windowRef;
    }

    /** Closes all windows */
    public closeAll(): void {
        this.references
            .forEach((windowRef) => windowRef.close());
    }

    private createDynamicWindow(config: DynamicWindowConfig): DynamicWindowRefModel {
        const windowRef = new DynamicWindowRefModel();
        const windowInjector = new DynamicWindowInjector({
            injector: this.injector,
            config,
            windowRef
        });
        const componentRef = this.createComponentRef(windowInjector);

        windowRef.setComponentRef(componentRef);
        this.initWindowRefAfterClosedObserver(windowRef, componentRef);
        this.appendWindowComponentToBody(componentRef);

        return windowRef;
    }

    private createComponentRef(
        windowInjector: DynamicWindowInjector
    ): ComponentRef<DynamicWindowComponent> {
        const componentFactory = this.componentFactoryResolver
            .resolveComponentFactory(DynamicWindowComponent);

        return componentFactory.create(windowInjector);
    }

    private appendWindowComponentToBody(componentRef: ComponentRef<DynamicWindowComponent>): void {
        const componentHostView = componentRef.hostView as EmbeddedViewRef<unknown>;
        const componentHtmlElement = componentHostView.rootNodes[0] as HTMLElement;

        this.applicationRef.attachView(componentHostView);
        this.document.body.appendChild(componentHtmlElement);
    }

    private initWindowRefAfterClosedObserver(
        windowRef: DynamicWindowRefModel,
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

    private applyDataForCreatedWindowInstance(
        { windowRef, component }: DynamicWindowInputParams
    ): void {
        const { instance: windowInstance } = windowRef.componentRef;

        windowInstance.childComponentType = component;
        windowInstance.windowRef = windowRef;
    }
}
