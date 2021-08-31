import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Doc, DocComponent, DocInjectable } from '../interfaces';
import { LibDocState } from '../states';
import { BaseDocService } from './base-doc.service';
import { LibDocApiService } from './lib-doc-api.service';

@Injectable({
    providedIn: 'root'
})
export class LibDocService extends BaseDocService {
    constructor(
        private readonly api: LibDocApiService,
        private readonly state: LibDocState
    ) {
        super();
    }

    public update(): Observable<Doc> {
        return this.api.get()
            .pipe(
                tap((documentation) => console.log('lib-doc', documentation)),
                tap((documentation) => this.state.set(documentation))
            );
    }

    public findDocComponentsByTypes(componentTypes: Type<any>[]): DocComponent[] {
        return componentTypes
            .map((componentType) => {
                return this.state.data.components
                    .find((component) => component.name === componentType.name);
            });
    }

    public findDocInjectablesByTypes(serviceTypes: Type<any>[]): DocInjectable[] {
        return serviceTypes
            .map((serviceType) => {
                return this.state.data.injectables
                    .find((service) => service.name === serviceType.name);
            });
    }
}
