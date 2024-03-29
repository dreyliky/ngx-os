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
import { ɵDynamicWindowInjector, ɵDynamicWindowRefModel } from '../classes';
import { ɵDynamicWindowComponent } from '../components';
import { DynamicWindowConfig, DynamicWindowRef } from '../interfaces';
import { ɵDynamicWindowReferencesService } from './dynamic-window-references.service';

/** Allows open your component inside an OS-styled window **/
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
        private readonly referencesService: ɵDynamicWindowReferencesService
    ) {}

    /** Opens a window containing the given component */
    public open(component: Type<any>, config: DynamicWindowConfig = {}): DynamicWindowRef {
        const windowRef = this.createDynamicWindow();
        windowRef.componentRef.instance.childComponentType = component;

        this.referencesService.register(windowRef, config);

        return windowRef;
    }

    /** Closes all windows */
    public closeAll(): void {
        this.references
            .forEach((windowRef) => windowRef.close());
    }

    private createDynamicWindow(): ɵDynamicWindowRefModel {
        const windowRef = new ɵDynamicWindowRefModel();
        const windowInjector = new ɵDynamicWindowInjector({ injector: this.injector, windowRef });
        const componentRef = this.createComponentRef(windowInjector);

        windowRef.setComponentRef(componentRef);
        this.initWindowRefAfterClosedObserver(windowRef, componentRef);
        this.appendWindowComponentToBody(componentRef);

        return windowRef;
    }

    private createComponentRef(
        windowInjector: ɵDynamicWindowInjector
    ): ComponentRef<ɵDynamicWindowComponent> {
        return this.componentFactoryResolver
            .resolveComponentFactory(ɵDynamicWindowComponent)
            .create(windowInjector);
    }

    private appendWindowComponentToBody(componentRef: ComponentRef<ɵDynamicWindowComponent>): void {
        const componentHostView = componentRef.hostView as EmbeddedViewRef<unknown>;
        const componentHtmlElement = componentHostView.rootNodes[0] as HTMLElement;

        this.applicationRef.attachView(componentHostView);
        this.document.body.appendChild(componentHtmlElement);
    }

    private initWindowRefAfterClosedObserver(
        windowRef: ɵDynamicWindowRefModel,
        componentRef: ComponentRef<ɵDynamicWindowComponent>
    ): void {
        const destroyDelayInMs = 300;

        windowRef.afterClosed$
            .pipe(
                tap(() => this.referencesService.remove(windowRef)),
                delay(destroyDelayInMs)
            )
            .subscribe(() => componentRef.destroy());
    }
}
